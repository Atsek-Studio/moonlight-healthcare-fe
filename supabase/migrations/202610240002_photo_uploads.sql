-- Optional: run once to enable staff photo uploads in the website manager.
-- Requires the content-studio migration (cms_admins table).
begin;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('clinic-media','clinic-media',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
create policy "Approved clinic staff upload photos" on storage.objects for insert to authenticated
with check(bucket_id='clinic-media' and exists(select 1 from public.cms_admins where user_id=(select auth.uid())));
-- Bucket is public for website visitors. No public or staff UPDATE/DELETE policy is added.
commit;
