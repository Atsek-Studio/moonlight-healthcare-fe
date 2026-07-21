# Design — Moon Healthcare

A locked design system for this app. Every route reads this file as the visual source of truth.

## Concept

Moon Healthcare is presented as a contemporary Vietnamese Đông y clinic: rooted in scholarship, materia medica, pulse diagnosis, and careful observation. The visual language borrows from herbal ledgers, archival medical plates, rice paper, carved seals, and dark lacquered wood—without becoming theatrical, mystical, or antique-shop decorative.

## Genre

Editorial healthcare with an austere herbal-apothecary register: warm, scholarly, credible, and quietly human.

## Audience and primary job

- Audience: Vietnamese families looking for credible traditional care and clear guidance.
- Primary job: understand the clinic’s treatments, then book a consultation.
- Trust posture: explain first; never promise cures, fabricate proof, or use spiritual spectacle.

## Macrostructure family

- Home: Marquee Hero, with the explanation and consultation actions below the fold.
- Service and product discovery: Catalogue; equal items, archival crops, hairline rows.
- Detail, About, practitioners, and Library: Long Document; narrow reading measure with inline evidence and images.
- Booking: Workbench; one calm task surface with a visible four-stage sequence.
- FAQ: Conversational FAQ within the Long Document family.

## Theme

- Paper: `oklch(97% 0.018 86)`
- Paper 2: `oklch(94% 0.025 88)`
- Paper 3: `oklch(89% 0.034 90)`
- Ink: `oklch(22% 0.035 145)`
- Ink 2: `oklch(33% 0.045 140)`
- Rule: `oklch(82% 0.035 92)`
- Accent: `oklch(45% 0.17 30)`—vermilion, limited to seals, active states, links, and the outer focus ring.
- Axis: light / classical-serif / warm.

## Typography

- Display: Cardo, weight 700, roman. Used for headings and the Moon Healthcare wordmark.
- Body: IBM Plex Sans, weights 400 and 600. Used for prose and controls.
- Outlier: IBM Plex Mono, weight 500. Used only for clinic facts and colophon text.
- Display tracking: `-0.025em`; display cap: `5.25rem`.
- Vietnamese copy uses sentence case; no faux small caps or italic headings.

## Spacing

Four-point named scale, defined in `tokens.css`. Layouts use negative space, hairlines, and asymmetric column ratios rather than repeated cards.

## Motion

- One short opacity/translate entrance on the first route block only.
- Buttons press by one pixel; menus and accordions use opacity and transform only.
- No hover lifts on content cards and no universal scroll reveals.
- Reduced motion becomes opacity-only at no more than 150ms.

## Microinteractions stance

- Silent success and specific, instructional errors.
- Focus appears instantly; hover exists only for fine pointers.
- Every touch target is at least 44px.
- Booking preserves user choices between stages and disables progression only when required information is missing.

## CTA voice

- Primary: dark medicinal-ink fill, square-cut corners, concise verb-first label.
- Secondary: typographic link or hairline outline; vermilion appears as a rule or arrow, not a large fill.

## Image treatment

- Existing clinic, practitioner, herb, and product photography is retained as evidence.
- Crops are quiet and archival: low saturation, warm paper tint, square or portrait ratios, hairline captions.
- No glass overlays, floating badges, glows, generated mysticism, yin-yang decoration, or generic bamboo motifs.

## What pages MUST share

- N6 institutional masthead, Ft4 clinic colophon, Cardo + IBM Plex pairing, warm paper, medicinal ink, vermilion placement, square CTA geometry, focus ring, spacing tokens, and quiet motion.

## What pages MAY differ on

- Reading measure, image ratio, catalogue density, section order, and whether the page is narrative or task-led.

## Exports

### tokens.css

The complete source is `tokens.css` at the project root.

### Tailwind v4 `@theme`

```css
@theme {
  --color-paper: oklch(97% 0.018 86);
  --color-paper-2: oklch(94% 0.025 88);
  --color-paper-3: oklch(89% 0.034 90);
  --color-ink: oklch(22% 0.035 145);
  --color-ink-2: oklch(33% 0.045 140);
  --color-rule: oklch(82% 0.035 92);
  --color-accent: oklch(45% 0.17 30);
  --font-display: "Cardo", ui-serif, serif;
  --font-body: "IBM Plex Sans", ui-sans-serif, sans-serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --spacing-md: 1.5rem;
  --text-md: 1.125rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG tokens.json

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(97% 0.018 86)", "$type": "color" },
    "paper-2": { "$value": "oklch(94% 0.025 88)", "$type": "color" },
    "paper-3": { "$value": "oklch(89% 0.034 90)", "$type": "color" },
    "ink": { "$value": "oklch(22% 0.035 145)", "$type": "color" },
    "ink-2": { "$value": "oklch(33% 0.045 140)", "$type": "color" },
    "rule": { "$value": "oklch(82% 0.035 92)", "$type": "color" },
    "accent": { "$value": "oklch(45% 0.17 30)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Cardo, ui-serif, serif", "$type": "fontFamily" },
    "body": { "$value": "IBM Plex Sans, ui-sans-serif, sans-serif", "$type": "fontFamily" },
    "outlier": { "$value": "IBM Plex Mono, ui-monospace, monospace", "$type": "fontFamily" }
  },
  "space": { "md": { "$value": "1.5rem", "$type": "dimension" } }
}
```

### shadcn/ui CSS variables

```css
:root {
  --background: 97% 0.018 86;
  --foreground: 22% 0.035 145;
  --card: 94% 0.025 88;
  --card-foreground: 22% 0.035 145;
  --primary: 22% 0.035 145;
  --primary-foreground: 97% 0.018 86;
  --secondary: 89% 0.034 90;
  --secondary-foreground: 33% 0.045 140;
  --muted: 82% 0.035 92;
  --muted-foreground: 43% 0.035 125;
  --accent: 45% 0.17 30;
  --accent-foreground: 97% 0.018 86;
  --border: 82% 0.035 92;
  --input: 62% 0.04 94;
  --ring: 45% 0.17 30;
  --radius: 0.125rem;
}
```
