import type { ContentItem } from '../types';
import { useCollection } from '../content/ContentProvider';
import { phoneLink } from '../content/contact';
export function useContactInfo() {
  const settings: Partial<ContentItem> = useCollection('contactInfo')[0] || {};
  const locations = useCollection('locations');
  const phone = settings.phone || locations[0]?.phone || '';
  return {
    settings,
    locations,
    phone,
    phoneHref: phoneLink(phone),
    zaloHref: settings.zaloUrl || '#contact'
  };
}
