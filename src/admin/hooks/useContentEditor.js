import { useEffect, useState } from 'react';
import { loadDraft, saveDraft, publishDraft } from '../../content/repository';
import { cloneContent } from '../../content/defaults';
export function useContentEditor() {
  const [record, setRecord] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const dirty = Boolean(record && JSON.stringify(content) !== JSON.stringify(record.content));
  async function reload() {
    setLoading(true);
    setError('');
    try {
      const next = await loadDraft();
      setRecord(next);
      setContent(cloneContent(next.content));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    reload();
  }, []);
  useEffect(() => {
    const warn = event => {
      if (dirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function updateItem(key, id, changes) {
    setMessage('');
    setError('');
    setContent(previous => {
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
  function changeCollection(key, update) {
    setMessage('');
    setError('');
    setContent(previous => ({
      ...previous,
      collections: {
        ...previous.collections,
        [key]: update(previous.collections[key])
      }
    }));
  }
  async function save() {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const next = await saveDraft(content, record.version);
      setRecord(cloneContent(next));
      setMessage('Draft saved. The public page has not changed.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function publish() {
    if (dirty || !record.version) {
      setError('Save your draft before publishing.');
      return;
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await publishDraft(record.version);
      setMessage('Published successfully. The public page now uses this content.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  function discard() {
    setContent(cloneContent(record.content));
    setError('');
    setMessage('Unsaved changes discarded.');
  }
  return {
    content,
    record,
    loading,
    busy,
    dirty,
    error,
    message,
    updateItem,
    changeCollection,
    save,
    publish,
    discard,
    reload
  };
}
