# Project rules

- Use TypeScript exclusively for all application code, React components, configuration, scripts, and tests. Use `.ts` and `.tsx`; do not add `.js`, `.jsx`, `.mjs`, or `.cjs` source files. This is the project owner's explicit preference.
- Keep logic separate from views and use reusable components.
- Preserve strict type checking. Do not bypass it with `any`, `@ts-nocheck`, or `@ts-ignore`. Validate untrusted data at runtime.
- Run `npm run check:typescript`, `npm test`, and `npm run build` before completing changes.
- Browser bundles in ignored `dist/` and third-party dependencies in `node_modules/` are generated artifacts, not authored source. They may contain JavaScript because browsers execute JavaScript.
