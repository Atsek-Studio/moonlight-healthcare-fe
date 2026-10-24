import { supabase, publicSupabase, isSupabaseConfigured, isLocalEditor } from '../lib/supabase';
import { defaultContent, cloneContent } from './defaults';
import { validateContent, toPublishedContent } from './schema';
const DRAFT_KEY = 'moonlight.cms.draft.v1';
const PUBLISHED_KEY = 'moonlight.cms.published.v1';
function readLocal(key) {
  const value = localStorage.getItem(key);
  if (!value) return null;
  const record = JSON.parse(value);
  validateContent(record.content);
  return record;
}
function result(data, error) {
  if (error) throw new Error(error.message);
  return data;
}
export async function loadPublished() {
  if (!isSupabaseConfigured) return isLocalEditor ? readLocal(PUBLISHED_KEY)?.content || cloneContent(defaultContent) : cloneContent(defaultContent);
  const {
    data,
    error
  } = await publicSupabase.from('site_content').select('content').eq('id', 'main').maybeSingle();
  result(data, error);
  return data ? validateContent(data.content) : cloneContent(defaultContent);
}
export async function loadDraft() {
  if (!isSupabaseConfigured) {
    if (!isLocalEditor) throw new Error('Configure Supabase to use the admin area.');
    return readLocal(DRAFT_KEY) || {
      content: await loadPublished(),
      version: 0,
      updated_at: null
    };
  }
  const {
    data,
    error
  } = await supabase.from('site_content_drafts').select('content, version, updated_at').eq('id', 'main').maybeSingle();
  result(data, error);
  if (data) validateContent(data.content);
  return data || {
    content: await loadPublished(),
    version: 0,
    updated_at: null
  };
}
export async function saveDraft(content, expectedVersion) {
  validateContent(content);
  if (!isSupabaseConfigured) {
    if (!isLocalEditor) throw new Error('Configure Supabase to save content.');
    const current = readLocal(DRAFT_KEY);
    if ((current?.version || 0) !== expectedVersion) throw new Error('Another editor saved changes. Reload the latest draft before saving.');
    const record = {
      content,
      version: expectedVersion + 1,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(record));
    return record;
  }
  const {
    data,
    error
  } = await supabase.rpc('cms_save_draft', {
    p_content: content,
    p_expected_version: expectedVersion
  });
  return result(data, error);
}
export async function publishDraft(expectedVersion) {
  if (!isSupabaseConfigured) {
    if (!isLocalEditor) throw new Error('Configure Supabase to publish content.');
    const draft = readLocal(DRAFT_KEY);
    if (!draft || draft.version !== expectedVersion) throw new Error('The saved draft changed. Reload it before publishing.');
    localStorage.setItem(PUBLISHED_KEY, JSON.stringify({
      ...draft,
      content: toPublishedContent(draft.content)
    }));
    window.dispatchEvent(new Event('moonlight-content-published'));
    return draft;
  }
  const {
    data,
    error
  } = await supabase.rpc('cms_publish', {
    p_expected_version: expectedVersion
  });
  return result(data, error);
}
