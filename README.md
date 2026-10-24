# An Nhiên — Traditional Medicine Clinic

React + TypeScript + Vite conversion of `traditional-medicine-clinic-v1.html`, preserving the Vietnamese content, original responsive layout, example photography, and demo interactions.

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
- The booking form validates required fields, phone format, and a local-calendar minimum date. Confirmation stays in memory; nothing is submitted or stored.
- The mobile navigation closes after choosing a link or pressing Escape.
- The map selector changes the embedded Google Maps region.
- VI / EN translates the labels and headings marked for translation in the reference. Other copy remains Vietnamese, matching the original scope.
- Photos are example Unsplash images; the local botanical illustration appears if a photo cannot load. Replace the image URLs in `src/data/clinic.ts` and the Hero, About, and Videos sections with your own assets.
- Google Fonts and the map need an internet connection. System font fallbacks and the bundled image remain available offline.

Doctor profiles, metrics, testimonials, addresses, products, and video entries are explicitly illustrative. The page does not include a backend, live appointment submission, checkout, or configured hotline/Zalo account.


## Content studio

Open `/admin` to manage the public website. The editor supports add/edit/remove/reorder, visible/hidden cards, page text and images, draft saves, a draft preview, and confirmed publication. Behavior stays in hooks and repository modules; admin views live in `src/admin/components`.

Without Supabase, development mode provides an explicitly labeled browser-local editor. Production requires Supabase configuration and an approved staff account. Setup, migration, environment variables, and access verification are documented in [supabase/SETUP.md](supabase/SETUP.md).

Run the content validation tests with `npm test`. Collection defaults remain in `src/data/clinic.ts`; section text and images are in `src/content/pageDefaults.json`. Published database content supersedes these defaults.
