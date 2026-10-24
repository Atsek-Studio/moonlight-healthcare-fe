import type { ContentItem, SiteContent, DraftRecord, SectionKey, CollectionKey } from '../../types';
import { saveAndPublish } from '../workflow';
import { useEffect, useState } from 'react';
import { loadDraft, loadPublished, saveDraft, publishDraft } from '../../content/repository';
import { cloneContent } from '../../content/defaults';
import { toPublishedContent } from '../../content/schema';
import { stableString, changedSections, friendlyError } from '../presentation';
export function useContentEditor() {
  const [record, setRecord] = useState<DraftRecord|null>(null),
    [content, setContent] = useState<SiteContent|null>(null),
    [published, setPublished] = useState<SiteContent|null>(null);
  const [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [message, setMessage] = useState('');
  const dirty = Boolean(record && stableString(content) !== stableString(record.content));
  let pending = false;
  if (content && published) {
    try {
      pending = stableString(toPublishedContent(content)) !== stableString(toPublishedContent(published));
    } catch {
      pending = true;
    }
  }
  const changes = changedSections(content, published);
  async function reload() {
    setLoading(true);
    setError('');
    try {
      const [next, live] = await Promise.all([loadDraft(), loadPublished()]);
      setRecord(next);
      setContent(cloneContent(next.content));
      setPublished(live);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      setError(friendlyError(err.message));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    reload();
  }, []);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function updateItem(key: SectionKey, id: string, changes: Partial<ContentItem>) {
    setMessage('');
    setError('');
    setContent(previous => {
      if (!previous) return previous;
      const next = cloneContent(previous);
      const items = key === 'pageContent' ? next.pageContent : next.collections[key];
      const index = items.findIndex(item => item.id === id);
      if (index >= 0) items[index] = {
        ...items[index],
        ...changes
      };
      return next;
    });
  }
  function changeCollection(key: CollectionKey, update: (items:ContentItem[])=>ContentItem[]) {
    setMessage('');
    setError('');
    setContent(previous => previous ? ({
      ...previous,
      collections: {
        ...previous.collections,
        [key]: update(previous.collections[key])
      }
    }) : previous);
  }
  async function save(nextContent: SiteContent | null = content) {
    if (!nextContent || !record) return false;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const next = await saveDraft(nextContent, record.version);
      setRecord(cloneContent(next));
      setContent(cloneContent(next.content));
      setMessage('Preview updated. Publish when you are ready.');
      return true;
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      setError(friendlyError(err.message));
    } finally {
      setBusy(false);
    }
  }
  async function updateWebsite() {
    if (!content || !record) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const next = await saveAndPublish({
        content,
        record,
        dirty
      }, {
        saveDraft,
        publishDraft
      }, saved => {
        setRecord(cloneContent(saved));
        setContent(cloneContent(saved.content));
      });
      setPublished(toPublishedContent(next.content));
      setMessage('Your website is updated. Visitors can now see your changes.');
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      setError(friendlyError(err.message));
    } finally {
      setBusy(false);
    }
  }
  async function discardAll() {
    if (!published || !record) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const next = await saveDraft(cloneContent(published), record.version);
      setRecord(cloneContent(next)); setContent(cloneContent(next.content));
      setMessage('Unpublished changes discarded. The preview matches your published website.');
    } catch (err) {
      if (!(err instanceof Error)) throw err; setError(friendlyError(err.message)); }
    finally { setBusy(false); }
  }
  function discard() {
    if (!record) return;
    setContent(cloneContent(record.content));
    setError('');
    setMessage('Your unsaved changes have been undone.');
  }
  return {
    content,
    record,
    published,
    loading,
    busy,
    dirty,
    pending,
    changes,
    error,
    message,
    updateItem,
    changeCollection,
    save,
    updateWebsite,
    discard,
    discardAll,
    reload
  };
}
