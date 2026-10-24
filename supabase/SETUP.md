# Connect the content studio to Supabase

The admin area is `/admin`. The app talks directly to Supabase using its official JavaScript client. There is no standalone API server.

## 1. Create the project and database tables

Create a Supabase project. Open **SQL Editor** and run the complete migration in:

`supabase/migrations/202610240001_content_studio.sql`

Run it once on a new project. It creates:

- `cms_admins`: explicitly approved staff; users can only read their own membership.
- `site_content_drafts`: staff-only draft content and a revision counter.
- `site_content`: public, published content only.
- `cms_save_draft`: authorized draft save with optimistic concurrency checking.
- `cms_publish`: authorized publication of a saved revision. Hidden cards are removed from the public document entirely.

RLS is enabled on all tables. Anonymous visitors have read-only access to published content. Staff cannot grant themselves admin access. Draft/public writes go through the two checked database functions.

## 2. Create your first staff account

In **Authentication → Users**, create an account using your staff email and a strong password. Use the dashboard's confirmed-user option for a manually created staff account. Copy that user's UUID.

Run this in the SQL Editor, substituting the actual UUID:

```sql
insert into public.cms_admins(user_id)
values ('REPLACE-WITH-THE-STAFF-USER-UUID');
```

Keep public sign-ups disabled if this project only uses staff authentication. There is no public sign-up form in this app.

To revoke access later:

```sql
delete from public.cms_admins
where user_id = 'REPLACE-WITH-THE-STAFF-USER-UUID';
```

Database policies immediately prevent further draft access and writes, even if the old UI is still open.

## 3. Configure the frontend

Copy `.env.example` to `.env.local` and set:

```dotenv
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR-PUBLISHABLE-KEY
```

Get these in your Supabase project API settings. Use a publishable key (or the legacy `anon` key), **never** a secret or `service_role` key. Vite exposes all `VITE_` variables to browsers.

For Vercel or another host, configure the same environment variables in its dashboard and rebuild the app. The included `vercel.json` rewrite supports direct `/admin` navigation.

Restart the dev server after changing `.env.local`.

## 4. Sign in and publish

1. Run `npm install` and `npm run dev`.
2. Open `/admin` and sign in with the staff account.
3. Edit the starter content. The bundled content is used until the first publication, so no seed script is needed.
4. **Save draft** stores a staff-only revision. It does not change the public site.
5. **Preview draft** shows your current edits without publishing them.
6. **Publish** asks for confirmation, then publishes the saved revision.
7. Open the public website. It loads the published document on initial load and when the tab regains focus.

A changed draft revision prevents a second editor from accidentally overwriting or publishing stale data. Reload the latest draft when the editor reports a conflict.

## Images and translations

The editor accepts HTTP(S) URLs and relative image paths. You can keep the example photos, add files to `public/images`, or paste a public Supabase Storage image URL. A Storage upload UI is not included in this version. If you create a public image bucket, configure upload/write permissions for approved staff only; never permit public writes.

Page copy supports Vietnamese and optional English text. Only literal `<em>…</em>` emphasis tokens are rendered; HTML is not injected. Collection text uses the existing language scope, with English fields for care principles and statistics.

## Local development without Supabase

When environment variables are absent, `npm run dev` offers **Open local editor**. It stores content in this browser's localStorage under:

- `moonlight.cms.draft.v1`
- `moonlight.cms.published.v1`

This is an explicit development preview, not authentication or shared storage. Your first Supabase project starts from the bundled defaults, not the browser's local preview data. A production build with no Supabase configuration displays a setup screen at `/admin` and disables the local editor. The public page still displays the bundled starter content.

## Verify database access after setup

Use Supabase's policy testing tools or separate browser sessions to verify:

- A signed-out visitor can read `site_content` but cannot read drafts or staff membership.
- A signed-in account missing from `cms_admins` cannot read drafts or call either write function.
- An approved staff account can save and publish.
- A hidden item is absent from the published table's JSON.
- Two editors loading the same revision cannot both overwrite it.

The database migration has not been executed against a live Supabase project by this task. Apply it and perform these checks before sharing staff access.

This CMS handles public marketing content. Appointment submission remains the original demo and is not connected to these tables.


## Contact information and clinic locations

In `/admin`, select **Contact information** to set the hotline, email, full Zalo URL, opening hours, and contact introduction. Select **Clinic locations** to add named branches with a full address, an optional precise map query or coordinates, and optional branch phone/hours. Turn on **Show on public page** for locations you want to display.

Save the draft, preview the map, and publish. Published locations populate the contact map selector and booking form. Call/Zalo buttons use the published contact channels; branch phone and hours override the general values when that branch is selected. With no configured location the page labels its map as an illustrative overview, and the booking form cannot select a nonexistent branch.

Existing content is upgraded automatically without replacing your edits. These settings use the existing content JSON, so no additional SQL migration is required. Blank contact fields retain the page's placeholder text where appropriate. Supabase configuration is still required for shared production edits.

## Facebook videos and Reels

Open **Videos** in `/admin`. Add a title, paste a public Facebook video or Facebook Reel URL, and choose a cover image. The first visible entry with a video link becomes the large featured video; reorder entries to change it. Player format defaults to automatic, with portrait and landscape overrides. Save the draft and publish.

Supported full links include `/reel/VIDEO_ID`, `/watch/?v=VIDEO_ID`, `/PAGE/videos/VIDEO_ID`, and Facebook's `plugins/video.php?href=...` URL (not iframe HTML). Tracking parameters are removed and the player URL is generated only for Facebook's own plugin endpoint. `fb.watch` and `/share/r/` or `/share/v/` short links are saved as link-only entries: expand them in Facebook and copy the full video/Reel URL to enable an inline player.

Visitors open the player by clicking a video cover; no Facebook player is loaded before that action. Closing the dialog removes the iframe. An **Open on Facebook** link is always available because Facebook may block embeds for private, removed, restricted, or non-embeddable content. A loaded iframe cannot reliably tell this app whether Facebook permits playback, so the app does not claim to verify that a video is playable. No Facebook login, access token, download, or backend service is required by this integration.

These fields use the existing content JSON. No additional Supabase migration is required.


## Staff-friendly website manager

The manager now opens on Home with shortcuts for common clinic tasks. **Save for later** keeps edits private. **Update website** saves and publishes the latest version together after a confirmation; staff no longer need to save a draft first. **Preview** shows all current edits without changing the live website. Optional details and English fields are under More options.

For production photo uploads, run `supabase/migrations/202610240002_photo_uploads.sql` once after the original CMS migration. It creates the public `clinic-media` photo bucket with staff-only inserts, an image MIME allowlist, and a file-size limit. The UI reduces uploaded photos before sending them. There are no new public write permissions. Uploaded photos are public website assets; do not upload private medical documents here. Replacing a photo does not delete the old Storage object, so historical assets can be cleaned up by the project owner when no longer needed.

In local practice mode, uploads are resized and stored only in this browser's content. Large photo collections can reach browser storage limits; use Supabase for a shared live website. The current CMS document limit is 2 MB. **Choose an example** works without configuring Storage, and existing photo links are still supported under Already have a photo link.
