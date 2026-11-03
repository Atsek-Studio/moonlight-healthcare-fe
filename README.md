# An Nhiên — Traditional Medicine Clinic

React + TypeScript + Vite website for An Nhiên, with a botanical editorial design, interactive care guide, visit preparation planner, and content studio.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

## Project structure

- `src/App.tsx`: page composition.
- `src/sections/`: one component per page section, header, footer, and mobile controls.
- `src/components/`: reusable cards, booking form, images, translations, and accessible information dialog.
- `src/hooks/`: navigation, language state, dialog actions, booking validation, and branch map logic.
- `src/data/clinic.ts`: editable services, doctors, products, testimonials, articles, process steps, and statistics.
- `src/styles/main.css`: responsive styles from the reference.
- `public/images/herbal-example.svg`: bundled example fallback image.

## Behavior and content

- Service, product, video, and contact actions open a native dialog with keyboard dismissal and focus management.
- The visit planner at `#booking` lets visitors choose a care topic and an optional future date without collecting personal or health information. With a configured clinic email, it opens a mail draft containing those choices; otherwise it offers configured phone/Zalo contact, or clearly states that appointments are not open. No appointment is automatically booked.
- The mobile navigation closes after choosing a link or pressing Escape.
- The map selector changes the embedded Google Maps region.
- VI / EN translates the labels and headings marked for translation in the reference. Other copy remains Vietnamese, matching the original scope.
- The hero uses a locally bundled AI botanical illustration. About and journal photography is bundled locally from the existing Unsplash assets, with credits in the footer. The botanical SVG remains the failure fallback. Replace editorial imagery with approved clinic assets when available.
- Google Fonts and the map need an internet connection. System font fallbacks and the bundled image remain available offline.

Doctor profiles, metrics, testimonials, products, and video entries remain available in the CMS but are hidden in the new default content until staff enable approved entries. Existing saved CMS publications and drafts retain their content. The page does not include live appointment submission or checkout; staff must configure real contact channels.


## Content studio

Open `/admin` to manage the public website. The editor supports add/edit/remove/reorder, visible/hidden cards, page text and images, draft saves, a draft preview, and confirmed publication. Behavior stays in hooks and repository modules; admin views live in `src/admin/components`.

Without Supabase, development mode provides an explicitly labeled browser-local editor. Production requires Supabase configuration and an approved staff account. Setup, migration, environment variables, and access verification are documented in [supabase/SETUP.md](supabase/SETUP.md).

Run the content validation tests with `npm test`. Collection defaults remain in `src/data/clinic.ts`; section text and images are in `src/content/pageDefaults.json`. Published database content supersedes these defaults.

## TypeScript-only development

All authored application code, React components, configuration, scripts, and tests use TypeScript (`.ts` / `.tsx`). The persistent project rule is in `AGENTS.md`. JavaScript source files are rejected by `npm run check:typescript`, which also runs before every build. Dependencies and compiled browser output are excluded from this source rule.

- `npm run typecheck`: strict checks for the app, configuration, scripts, and tests.
- `npm test`: run the TypeScript test suite.
- `npm run build`: enforce TypeScript-only source, check types, then create the production bundle.
- `src/types.ts`: shared content, editor, field, and media contracts.

The visual editor opens at `/admin`. Click a highlighted area, edit in the right-hand editor beside the preview, then save to refresh the private preview. Publish or discard unpublished changes with the footer controls.

The left sidebar always shows guidance and shortcuts. The preview occupies the middle. Desktop renders at a fixed 1440px viewport and scales to fit; mobile renders at 390px. Opening an editor panel never changes the selected viewport. Selecting an editable area opens a separate right-hand editor, which is hidden by default. Both sidebars remain visible while editing, without a backdrop over the preview.
