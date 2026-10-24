import type { SiteContent, CollectionKey, ChildrenProps } from '../types';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { defaultContent } from './defaults';
import { loadPublished } from './repository';
export const ContentContext = createContext<{content:SiteContent;refresh:()=>Promise<void>;error:string} | null>(null);
export function ContentProvider({
  children,
  override
}: ChildrenProps & {override?:SiteContent}) {
  const [content, setContent] = useState(defaultContent);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    try {
      setContent(await loadPublished());
      setError('');
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      setError(err.message);
    }
  }, []);
  useEffect(() => {
    if (override) return;
    refresh();
    const listener = () => refresh();
    window.addEventListener('focus', listener);
    window.addEventListener('storage', listener);
    window.addEventListener('moonlight-content-published', listener);
    return () => {
      window.removeEventListener('focus', listener);
      window.removeEventListener('storage', listener);
      window.removeEventListener('moonlight-content-published', listener);
    };
  }, [refresh, override]);
  return <ContentContext.Provider value={{
    content: override || content,
    refresh,
    error
  }}>{children}</ContentContext.Provider>;
}
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('ContentProvider is missing.');
  return context;
}
export function useCollection(key: CollectionKey) {
  return (useContent().content.collections[key] || []).filter(item => item.published);
}
export function useContentBlock(id?: string) {
  return useContent()?.content.pageContent.find(block => block.id === id) || defaultContent.pageContent.find(block => block.id === id);
}
