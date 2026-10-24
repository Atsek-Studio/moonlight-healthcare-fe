const field = (key, label, type = 'text', required = false) => ({
  key,
  label,
  type,
  required
});
const title = field('title', 'Title', 'text', true);
const description = field('description', 'Description', 'textarea', true);
const image = [field('image', 'Image URL', 'url'), field('alt', 'Image description')];
const tag = field('tag', 'Category label');
export const contentSections = [{
  key: 'pageContent',
  label: 'Page text & images',
  short: 'Page',
  description: 'Headlines, navigation, contact details, buttons, and section images.',
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
  description: 'Update video card titles, captions, and example thumbnails.',
  fields: [title, field('note', 'Caption'), ...image]
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
export function fieldsFor(section, item) {
  if (section.key !== 'pageContent') return section.fields;
  return item.kind === 'image' ? image : [field('vi', 'Vietnamese text', 'textarea', true), field('en', 'English text (optional)', 'textarea')];
}
export function safeImageUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value, 'https://local.invalid');
    return ['https:', 'http:'].includes(url.protocol);
  } catch {
    return false;
  }
}
export function validateItem(section, item) {
  for (const definition of fieldsFor(section, item)) {
    const value = item[definition.key] || '';
    if (definition.required && !value.trim()) return `${definition.label} is required.`;
    if (value.length > 12000) return `${definition.label} is too long (maximum 12,000 characters).`;
    if (definition.type === 'url' && !safeImageUrl(value)) return `${definition.label} must be an HTTP(S) URL or a relative image path.`;
  }
  return '';
}
export function validateContent(content) {
  if (!content || content.schemaVersion !== 1 || !content.collections || !Array.isArray(content.pageContent)) throw new Error('Unsupported content format.');
  for (const section of contentSections) {
    const items = section.key === 'pageContent' ? content.pageContent : content.collections[section.key];
    if (!Array.isArray(items) || items.length > 500) throw new Error(`Invalid ${section.label} collection.`);
    const ids = new Set();
    for (const item of items) {
      if (!item.id || ids.has(item.id)) throw new Error(`Missing or duplicate ID in ${section.label}.`);
      ids.add(item.id);
      if (section.key === 'pageContent' && !['text', 'image'].includes(item.kind)) throw new Error('Invalid page content block.');
      if (section.key !== 'pageContent' && typeof item.published !== 'boolean') throw new Error('Each content card needs a publication status.');
      for (const definition of fieldsFor(section, item)) if (item[definition.key] !== undefined && typeof item[definition.key] !== 'string') throw new Error(`Invalid ${definition.label}.`);
      const error = validateItem(section, item);
      if (error) throw new Error(`${section.label}: ${error}`);
    }
  }
  return content;
}
export function toPublishedContent(content) {
  validateContent(content);
  return {
    schemaVersion: 1,
    pageContent: JSON.parse(JSON.stringify(content.pageContent)),
    collections: Object.fromEntries(Object.entries(content.collections).map(([key, items]) => [key, items.filter(item => item.published).map(item => ({
      ...item
    }))]))
  };
}
