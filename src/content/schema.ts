import type { ContentItem, SiteContent, FieldDefinition, ContentSection } from '../types';
import { parseVideoUrl } from './video.ts';
import { isValidPhone, isExternalWebUrl } from './contact.ts';
const field = (key: FieldDefinition['key'], label: string, type: FieldDefinition['type'] = 'text', required = false): FieldDefinition => ({
  key,
  label,
  type,
  required
});
const title = field('title', 'Title', 'text', true);
const description = field('description', 'Description', 'textarea', true);
const image: FieldDefinition[] = [field('image', 'Image URL', 'url'), field('alt', 'Image description')];
const tag = field('tag', 'Category label');
export const contentSections: ContentSection[] = [{
  key: 'contactInfo',
  label: 'Contact information',
  short: 'Contact',
  singleton: true,
  description: 'Set your clinic hotline, email, Zalo link, opening hours, and contact introduction. Manage addresses in Clinic locations.',
  fields: [field('phone', 'Hotline / phone number', 'tel'), field('email', 'Contact email', 'email'), field('zaloUrl', 'Zalo contact URL', 'link'), field('openingHours', 'Opening hours', 'textarea'), field('note', 'Contact introduction', 'textarea')]
}, {
  key: 'locations',
  label: 'Clinic locations',
  short: 'Locations',
  description: 'Add clinic addresses and control which locations appear in the map and booking form.',
  fields: [field('title', 'Location name', 'text', true), field('address', 'Full address', 'textarea', true), field('mapQuery', 'Map address or coordinates'), field('phone', 'Location phone number', 'tel'), field('openingHours', 'Location opening hours', 'textarea')]
}, {
  key: 'pageContent',
  label: 'Page text & images',
  short: 'Page',
  description: 'Headlines, navigation labels, buttons, and section images. Contact settings are in Contact information.',
  fields: []
}, {
  key: 'serviceCards',
  label: 'Services',
  short: 'Services',
  description: 'Manage therapies and the information shown in service dialogs.',
  fields: [title, description, tag, ...image, field('detail', 'Service details', 'textarea')]
}, {
  key: 'doctorCards',
  label: 'Doctors',
  short: 'Doctors',
  description: 'Introduce your team with approved profiles and photographs.',
  fields: [title, description, tag, ...image]
}, {
  key: 'productCards',
  label: 'Products',
  short: 'Products',
  description: 'Maintain the herbal shop catalog and displayed prices.',
  fields: [title, description, tag, field('price', 'Display price'), ...image]
}, {
  key: 'articleCards',
  label: 'Health articles',
  short: 'Articles',
  description: 'Edit article cards featured in the health journal.',
  fields: [title, description, tag, ...image]
}, {
  key: 'videoCards',
  label: 'Videos',
  short: 'Videos',
  description: 'Attach Facebook videos or Reels, choose a cover image, and publish them in the website media section. The first linked video is featured.',
  fields: [title, field('videoUrl', 'Facebook video or Reel URL', 'video'), {
    ...field('orientation', 'Player format', 'select'),
    options: [{
      value: '',
      label: 'Automatic'
    }, {
      value: 'landscape',
      label: 'Landscape'
    }, {
      value: 'portrait',
      label: 'Portrait / Reel'
    }]
  }, field('note', 'Caption'), ...image]
}, {
  key: 'testimonialCards',
  label: 'Testimonials',
  short: 'Reviews',
  description: 'Publish approved patient experiences or retain the labeled examples.',
  fields: [field('name', 'Attribution', 'text', true), field('quote', 'Quote', 'textarea', true), field('note', 'Attribution note')]
}, {
  key: 'processSteps',
  label: 'Patient journey',
  short: 'Journey',
  description: 'Keep the steps of the clinic visit clear and up to date.',
  fields: [field('number', 'Step number'), title, description]
}, {
  key: 'carePillars',
  label: 'Care principles',
  short: 'Principles',
  description: 'Edit the values shown in the About section.',
  fields: [field('icon', 'Symbol'), title, field('titleEn', 'English title'), description, field('descriptionEn', 'English description', 'textarea')]
}, {
  key: 'statistics',
  label: 'Statistics',
  short: 'Statistics',
  description: 'Use verified figures and accurate labels.',
  fields: [field('value', 'Figure', 'text', true), field('label', 'Label', 'text', true), field('labelEn', 'English label')]
}];
export function fieldsFor(section: {key:string;fields:FieldDefinition[]}, item: Partial<ContentItem>) {
  if (section.key !== 'pageContent') return section.fields;
  return item.kind === 'image' ? image : [field('vi', 'Vietnamese text', 'textarea', true), field('en', 'English text (optional)', 'textarea')];
}
export function safeImageUrl(value?: string) {
  if (!value) return true;
  if (/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value)) return value.length <= 240000;
  try {
    const url = new URL(value, 'https://local.invalid');
    return ['https:', 'http:'].includes(url.protocol);
  } catch {
    return false;
  }
}
export function validateItem(section: {key:string;fields:FieldDefinition[]}, item: Partial<ContentItem>) {
  for (const definition of fieldsFor(section, item)) {
    const value = item[definition.key] || '';
    if (definition.required && !value.trim()) return `${definition.label} is required.`;
    if (value.length > 12000 && !(definition.key === 'image' && value.startsWith('data:image/') && safeImageUrl(value))) return `${definition.label} is too long (maximum 12,000 characters).`;
    if (definition.type === 'video' && value && !parseVideoUrl(value)) return 'Paste a Facebook video or Reel link, not a profile, post, or embed HTML.';
    if (definition.type === 'select' && value && !definition.options?.some(option => option.value === value)) return `Invalid ${definition.label}.`;
    if (definition.type === 'tel' && !isValidPhone(value)) return `${definition.label} must contain 7–15 digits, with an optional leading +.`;
    if (definition.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
    if (definition.type === 'link' && !isExternalWebUrl(value)) return `${definition.label} must be a full HTTP(S) URL.`;
    if (definition.type === 'url' && !safeImageUrl(value)) return `${definition.label} must be an HTTP(S) URL or a relative image path.`;
  }
  return '';
}
export function validateContent(input: unknown): SiteContent {
  const content = input as SiteContent;
  if (!content || content.schemaVersion !== 1 || !content.collections || !Array.isArray(content.pageContent)) throw new Error('Unsupported content format.');
  for (const section of contentSections) {
    const items = section.key === 'pageContent' ? content.pageContent : content.collections[section.key];
    if (!Array.isArray(items) || items.length > 500) throw new Error(`Invalid ${section.label} collection.`);
    if (section.singleton && (items.length !== 1 || items[0].published !== true)) throw new Error('Contact information must contain exactly one visible settings record.');
    const ids = new Set();
    for (const item of items) {
      if (!item.id || ids.has(item.id)) throw new Error(`Missing or duplicate ID in ${section.label}.`);
      ids.add(item.id);
      if (section.key === 'pageContent' && !['text', 'image'].includes(item.kind || '')) throw new Error('Invalid page content block.');
      if (section.key !== 'pageContent' && typeof item.published !== 'boolean') throw new Error('Each content card needs a publication status.');
      for (const definition of fieldsFor(section, item)) if (item[definition.key] !== undefined && typeof item[definition.key] !== 'string') throw new Error(`Invalid ${definition.label}.`);
      const error = validateItem(section, item);
      if (error) throw new Error(`${section.label}: ${error}`);
    }
  }
  return content;
}
export function toPublishedContent(content: SiteContent): SiteContent {
  validateContent(content);
  return {
    schemaVersion: 1,
    pageContent: JSON.parse(JSON.stringify(content.pageContent)),
    collections: Object.fromEntries(Object.entries(content.collections).map(([key, items]) => [key, items.filter(item => item.published).map(item => ({
      ...item
    }))])) as SiteContent['collections']
  };
}
