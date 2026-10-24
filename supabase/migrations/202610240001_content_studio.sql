-- Content Studio v1. Run in the Supabase SQL editor as the project owner.
-- No patient/appointment data is stored in these public-content tables.
begin;
create table public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table public.site_content (
  id text primary key check (id = 'main'),
  content jsonb not null,
  version integer not null default 1 check (version > 0),
  updated_at timestamptz not null default now()
);
create table public.site_content_drafts (
  id text primary key check (id = 'main'),
  content jsonb not null,
  version integer not null default 1 check (version > 0),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);
alter table public.cms_admins enable row level security;
alter table public.site_content enable row level security;
alter table public.site_content_drafts enable row level security;
revoke all on public.cms_admins, public.site_content, public.site_content_drafts from anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant select on public.cms_admins, public.site_content_drafts to authenticated;
create policy "Staff can check their own access" on public.cms_admins for select to authenticated using (user_id = (select auth.uid()));
create policy "Visitors read published website content" on public.site_content for select to anon, authenticated using (id = 'main');
create policy "Approved staff read drafts" on public.site_content_drafts for select to authenticated using (exists (select 1 from public.cms_admins where user_id = (select auth.uid())));

create function public.cms_save_draft(p_content jsonb, p_expected_version integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare saved public.site_content_drafts;
begin
  if auth.uid() is null or not exists (select 1 from public.cms_admins where user_id = auth.uid()) then
    raise exception 'Content editor access is required.' using errcode = '42501';
  end if;
  if p_expected_version is null or p_expected_version < 0 then raise exception 'Invalid draft version.'; end if;
  if p_content is null or p_content->>'schemaVersion' is distinct from '1'
    or jsonb_typeof(p_content->'collections') is distinct from 'object'
    or jsonb_typeof(p_content->'pageContent') is distinct from 'array'
    or octet_length(p_content::text) > 2097152 then raise exception 'Invalid content document (maximum 2 MB).'; end if;
  if exists (select 1 from jsonb_each(p_content->'collections') where jsonb_typeof(value) <> 'array') then raise exception 'Collections must be arrays.'; end if;
  if p_expected_version > 0 and not exists(select 1 from public.site_content_drafts where id='main') then raise exception 'Draft missing. Reload before saving.'; end if;
  insert into public.site_content_drafts (id,content,version,updated_at,updated_by)
  values ('main',p_content,1,now(),auth.uid())
  on conflict(id) do update set content=excluded.content,version=public.site_content_drafts.version+1,updated_at=now(),updated_by=auth.uid()
  where public.site_content_drafts.version=p_expected_version
  returning * into saved;
  if saved.id is null then raise exception 'Another editor saved changes. Reload the latest draft before saving.' using errcode='40001'; end if;
  return jsonb_build_object('content',saved.content,'version',saved.version,'updated_at',saved.updated_at);
end;
$$;

create function public.cms_publish(p_expected_version integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare draft public.site_content_drafts;
  visible_collections jsonb;
  published_content jsonb;
begin
  if auth.uid() is null or not exists (select 1 from public.cms_admins where user_id = auth.uid()) then
    raise exception 'Content editor access is required.' using errcode = '42501';
  end if;
  select * into draft from public.site_content_drafts where id='main' for update;
  if draft.id is null or p_expected_version is null or draft.version <> p_expected_version then
    raise exception 'The saved draft changed. Reload it before publishing.' using errcode='40001';
  end if;
  -- Hidden cards stay private: remove them from the public JSON, not just the UI.
  select coalesce(jsonb_object_agg(collection.key,
    coalesce((select jsonb_agg(item.value order by item.position)
      from jsonb_array_elements(collection.value) with ordinality as item(value,position)
      where item.value->'published' = 'true'::jsonb), '[]'::jsonb)), '{}'::jsonb)
    into visible_collections from jsonb_each(draft.content->'collections') as collection;
  published_content=jsonb_build_object('schemaVersion',1,'collections',visible_collections,'pageContent',draft.content->'pageContent');
  insert into public.site_content(id,content,version,updated_at)
  values('main',published_content,draft.version,now())
  on conflict(id) do update set content=excluded.content,version=excluded.version,updated_at=excluded.updated_at;
  return jsonb_build_object('version',draft.version,'updated_at',now());
end;
$$;
revoke all on function public.cms_save_draft(jsonb,integer) from public, anon, authenticated;
revoke all on function public.cms_publish(integer) from public, anon, authenticated;
grant execute on function public.cms_save_draft(jsonb,integer) to authenticated;
grant execute on function public.cms_publish(integer) to authenticated;
commit;
