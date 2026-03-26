# Moon Healthcare — Frontend

A modern Vietnamese healthcare web app for **Moon Healthcare**, a Traditional Medicine clinic. Built with React 19, TypeScript, and Tailwind CSS v4, following **Clean Architecture** principles.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (Vite plugin) |
| Routing | React Router v7 |
| Data Fetching | TanStack Query v5 |
| Animation | Motion (Framer Motion v12) |
| Icons | Lucide React |
| i18n | i18next + react-i18next (VI/EN) |
| Build | Vite v6 |
| Deploy | Vercel |

---

## Project Structure

```
src/
├── domain/           # Entities & repository interfaces (pure TypeScript)
├── data/
│   ├── datasources/  # Static data sources
│   └── repositories/ # Repository implementations
├── usecases/         # Business logic (one file per use case)
├── di/               # Dependency injection container (singleton instances)
├── presentation/
│   ├── components/   # Shared UI components (Navbar, Footer)
│   ├── hooks/        # React hooks wrapping use cases
│   └── pages/        # Route-level page components
├── i18n/
│   ├── config.ts
│   └── locales/      # vi.json, en.json
└── lib/              # Utilities (cn helper)
```

### Architecture Flow

```
Page → Hook → Use Case → Repository Interface → Repository Impl → Data Source
```

Pages never import repositories or data sources directly — all access goes through the DI container via hooks.

---

## Pages & Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Hero, philosophy, services preview, featured products, CTA |
| `/services` | Services | All services grid with view-details and book actions |
| `/service/:id` | ServiceDetail | Hero, benefits bento grid, treatment process, specialist, FAQ |
| `/products` | Products | Filterable / searchable product grid |
| `/product/:id` | ProductDetail | Full product info, ingredients, quality certs |
| `/practitioners` | Practitioners | Doctor team cards |
| `/about` | About | Story, values, contact form, map |
| `/faq` | FAQ | Searchable accordion FAQ |
| `/library` | Library | Articles and herbal remedy catalog |
| `/booking` | Booking | 4-step guided booking flow |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18 or Bun

### Install & Run

```bash
# Install dependencies
npm install
# or
bun install

# Start dev server (http://localhost:3000)
npm run dev

# Type-check
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Internationalization

The app supports **Vietnamese (VI)** and **English (EN)**. Translations live in:

- `src/i18n/locales/vi.json`
- `src/i18n/locales/en.json`

The language preference is persisted in `localStorage`. Toggle via the language button in the Navbar.

---

## Deployment (Vercel)

The repo includes a `vercel.json` that rewrites all paths to `index.html` for client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**To deploy:**
1. Push the repo to GitHub
2. Import the project in [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — build command: `npm run build`, output dir: `dist`

---

## Domain Entities

- **Service** — Clinical service (id, title, description, icon, image, benefits, processSteps, specialist, faqs)
- **Product** — Herbal product (id, name, price, description, category, benefits, ingredients)
- **Article** — Library article (id, title, excerpt, category, author)
- **Practitioner** — Doctor profile (id, name, role, avatar)
- **FAQ** — Question & answer (id, question, answer, category)

---

## Scripts

```bash
npm run dev       # Dev server on port 3000
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # TypeScript type-check (no emit)
npm run clean     # Remove dist/
```
