import type { SiteContent, DraftRecord } from '../types';
import { upgradeContactContent } from './contact';
import { supabase, publicSupabase, isSupabaseConfigured, isLocalEditor } from '../lib/supabase';
import { defaultContent, cloneContent } from './defaults';
import { validateContent, toPublishedContent } from './schema';
const DRAFT_KEY = 'moonlight.cms.draft.v1';
const PUBLISHED_KEY = 'moonlight.cms.published.v1';
function readLocal(key: string): DraftRecord | null {
  const value = localStorage.getItem(key);
  if (!value) return null;
  const record = JSON.parse(value);
  record.content = validateContent(upgradeContactContent(record.content));
  return record;
}
function result<T>(data: T, error: {message:string} | null): T {
  if (error) throw new Error(error.message);
  return data;
}
export async function loadPublished(): Promise<SiteContent> {
  if (!isSupabaseConfigured) return isLocalEditor ? readLocal(PUBLISHED_KEY)?.content || cloneContent(defaultContent) : cloneContent(defaultContent);
  const {
    data,
    error
  } = await publicSupabase!.from('site_content').select('content').eq('id', 'main').maybeSingle();
  result(data, error);
  return data ? validateContent(upgradeContactContent(data.content)) : cloneContent(defaultContent);
}
export async function loadDraft(): Promise<DraftRecord> {
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
  } = await supabase!.from('site_content_drafts').select('content, version, updated_at').eq('id', 'main').maybeSingle();
  result(data, error);
  if (data) data.content = validateContent(upgradeContactContent(data.content));
  return data || {
    content: await loadPublished(),
    version: 0,
    updated_at: null
  };
}
export async function saveDraft(content: SiteContent, expectedVersion: number): Promise<DraftRecord> {
  validateContent(content);
  if (new TextEncoder().encode(JSON.stringify(content)).length > 2097152) throw new Error('These changes contain too many large photos.');
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
  } = await supabase!.rpc('cms_save_draft', {
    p_content: content,
    p_expected_version: expectedVersion
  });
  return result(data, error);
}
export async function publishDraft(expectedVersion: number): Promise<DraftRecord> {
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
  } = await supabase!.rpc('cms_publish', {
    p_expected_version: expectedVersion
  });
  return result(data, error);
}
