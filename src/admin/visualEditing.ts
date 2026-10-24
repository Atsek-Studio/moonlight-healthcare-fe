import type { ContentItem, SiteContent, SectionKey } from '../types';
const cloneContent = <T,>(value:T):T => JSON.parse(JSON.stringify(value));
export function editableItems(content: SiteContent, key: SectionKey) {
  return key === 'pageContent' ? content.pageContent : content.collections[key] || [];
}
export function replaceEditableItem(content: SiteContent, key: SectionKey, item: ContentItem) {
  const next = cloneContent(content);
  const items = editableItems(next, key);
  const index = items.findIndex(entry => entry.id === item.id);
  if (index < 0) throw new Error('This item no longer exists. Open it again from the preview.');
  items[index] = cloneContent(item);
  return next;
}
