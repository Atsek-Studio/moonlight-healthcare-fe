import type { ContentItem, SiteContent } from '../types';
export const defaultContactInfo = [{
  id: 'clinic-contact',
  title: 'Clinic contact information',
  published: true,
  phone: '',
  email: '',
  zaloUrl: '',
  openingHours: '',
  note: ''
}];
// Backward-compatible upgrade for previously saved drafts/publications.
// Existing arrays, including an intentionally empty location list, are retained.
export function upgradeContactContent(content: unknown): SiteContent {
  const next = JSON.parse(JSON.stringify(content));
  if (!next?.collections || typeof next.collections !== 'object' || Array.isArray(next.collections)) return next;
  if (!Object.hasOwn(next.collections, 'contactInfo')) next.collections.contactInfo = JSON.parse(JSON.stringify(defaultContactInfo));
  if (!Object.hasOwn(next.collections, 'locations')) next.collections.locations = [];
  return next;
}
export function phoneLink(phone?: string) {
  return phone ? `tel:${phone.replace(/[^+0-9]/g, '')}` : '#contact';
}
export function isValidPhone(phone?: string) {
  return !phone || /^\+?[0-9 ().-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 7 && phone.replace(/\D/g, '').length <= 15;
}
export function isExternalWebUrl(value?: string) {
  if (!value) return true;
  try {
    return ['https:', 'http:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}
export function locationQuery(location?: Partial<ContentItem>) {
  return location?.mapQuery?.trim() || location?.address?.trim() || 'Ho Chi Minh City Vietnam';
}
export function directionsUrl(location?: Partial<ContentItem>) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery(location))}`;
}
