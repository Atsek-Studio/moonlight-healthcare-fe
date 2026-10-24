import type { SiteContent, FieldDefinition, CollectionKey } from '../types';
export const sectionGuides: Record<string,{label:string;noun:string;icon:string;description:string;task?:string}> = {
  contactInfo: {
    label: 'Contact information',
    noun: 'contact details',
    icon: '☎',
    description: 'Help people call, email, or message your clinic.',
    task: 'Change phone & contact details'
  },
  locations: {
    label: 'Clinic locations',
    noun: 'location',
    icon: '⌖',
    description: 'Add an address and show visitors how to get there.',
    task: 'Update clinic addresses'
  },
  serviceCards: {
    label: 'Services',
    noun: 'service',
    icon: '✳',
    description: 'Describe the care and treatments your clinic offers.',
    task: 'Edit your services'
  },
  doctorCards: {
    label: 'Doctors',
    noun: 'doctor',
    icon: '♙',
    description: 'Introduce your doctors with a name, photo, and a short profile.',
    task: 'Update doctor profiles'
  },
  videoCards: {
    label: 'Videos & Reels',
    noun: 'video',
    icon: '▷',
    description: 'Share a Facebook video or Reel with your website visitors.',
    task: 'Add a Facebook video'
  },
  articleCards: {
    label: 'Health articles',
    noun: 'article',
    icon: '▤',
    description: 'Update the health tips and articles on your home page.',
    task: 'Edit health articles'
  },
  productCards: {
    label: 'Products',
    noun: 'product',
    icon: '❀',
    description: 'Show products, photos, and prices in your herbal shop.'
  },
  pageContent: {
    label: 'Website text & photos',
    noun: 'website text',
    icon: 'Aa',
    description: 'Change the words and photos in each part of your website.'
  },
  testimonialCards: {
    label: 'Patient stories',
    noun: 'patient story',
    icon: '❞',
    description: 'Share patient feedback you have permission to publish.'
  },
  processSteps: {
    label: 'Visit steps',
    noun: 'step',
    icon: '①',
    description: 'Explain what happens before, during, and after a visit.'
  },
  carePillars: {
    label: 'Why choose us',
    noun: 'reason',
    icon: '✧',
    description: 'Explain what makes your clinic special.'
  },
  statistics: {
    label: 'Clinic facts',
    noun: 'fact',
    icon: '#',
    description: 'Keep the figures on your website accurate.'
  }
};
export const guideFor = (key: string) => sectionGuides[key] || {
  label: key,
  noun: 'item',
  icon: '✳',
  description: ''
};
export const mainSections = ['contactInfo', 'locations', 'serviceCards', 'doctorCards', 'videoCards', 'articleCards', 'productCards'];
export const extraSections = ['pageContent', 'testimonialCards', 'processSteps', 'carePillars', 'statistics'];
export function stableString(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(stableString).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + stableString((value as Record<string,unknown>)[key])).join(',') + '}';
  return JSON.stringify(value) ?? 'undefined';
}
export function changedSections(content: SiteContent | null, baseline: SiteContent | null) {
  if (!content || !baseline) return [];
  return Object.keys(sectionGuides).filter(key => stableString(key === 'pageContent' ? content.pageContent : content.collections[key as CollectionKey]) !== stableString(key === 'pageContent' ? baseline.pageContent : baseline.collections[key as CollectionKey])).map(key => guideFor(key).label);
}
export const plainText = (value: unknown) => typeof value === 'string' ? value.replace(/<\/?em>/g, '') : '';
export function fieldLabel(definition: FieldDefinition, key: string) {
  const overrides: Record<string,string> = {
    image: 'Photo',
    alt: 'Describe this photo',
    videoUrl: 'Paste your Facebook video or Reel link',
    orientation: 'Video shape',
    mapQuery: 'Find this location on the map',
    zaloUrl: 'Zalo link',
    vi: 'Website text',
    en: 'English version',
    titleEn: 'English name',
    descriptionEn: 'English description',
    tag: 'Small label above the name',
    detail: 'More information for visitors',
    note: 'Short caption',
    value: 'Number to show',
    label: 'What this number means',
    labelEn: 'English label',
    icon: 'Small symbol'
  };
  if (definition.key === 'title') return ({
    doctorCards: 'Doctor’s name',
    serviceCards: 'Service name',
    productCards: 'Product name',
    videoCards: 'Video title',
    articleCards: 'Article title',
    locations: 'Location name',
    processSteps: 'Step name'
  } as Record<string,string>)[key] || 'Name';
  if (definition.key === 'note' && key === 'contactInfo') return 'A short message for visitors';
  return overrides[definition.key] || definition.label;
}
export const advancedFields = new Set(['alt', 'orientation', 'mapQuery', 'titleEn', 'descriptionEn', 'en', 'labelEn', 'icon', 'tag']);
export function friendlyError(message = '') {
  if (/failed to fetch|network|load failed/i.test(message)) return 'We couldn’t connect. Your edits are still here. Check your connection and try again.';
  if (/quota|maximum 2 MB|too many large photos/i.test(message)) return 'There is not enough space for these photos. Choose smaller photos or ask your website owner to enable shared photo storage.';
  if (/schema cache|could not find the table|relation .* does not exist/i.test(message)) return 'Website editing is not ready yet. Please ask your website owner to finish the setup.';
  return message;
}
