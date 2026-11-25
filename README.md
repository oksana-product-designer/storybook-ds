# storybook-ds

A Storybook design system built from the "TVP | Checkout flow" Figma file.

- Vite + React 19 + TypeScript
- Storybook 10 (Docs, Controls, a11y, Viewport, Vitest)
- Plain CSS on CSS variables, no Tailwind
- Tokens generated from Figma variables, component props follow Figma component properties

## Getting started

```bash
npm install
npm run storybook        # http://localhost:6006
```

| Command | What it does |
|---|---|
| `npm run storybook` | Starts Storybook on port 6006 |
| `npm run build-storybook` | Builds a static Storybook into `storybook-static/` |
| `npx vitest --project storybook run` | Runs every story and its play function in Chromium |
| `npx tsc -p tsconfig.app.json --noEmit` | Type check |

The first Vitest run needs the Playwright browser: `npx playwright install chromium`.

## What is inside

**Foundations** (read from the tokens, never copied): Colors, Typography, Spacing.

**Components**: Button, ButtonGroup (with ButtonGroupItem), Input, Checkbox, Tag.
Every component has stories for all Figma variants and states, with autodocs.

| Component | Figma component | Main props |
|---|---|---|
| Button | Button | `variant`, `size`, `state`, `label`, icons |
| ButtonGroup | Button group, Button group item | `value`, `onChange`, `multiple`, item `content`, `selected`, `state` |
| Input | Input field | `variant`, `state`, `label`, helper, error and success text |
| Checkbox | Checkbox | `checked`, `state`, `description`, `label` |
| Tag | Badge | `variant`, `label`, `showIcon` |

Figma `Type` is the `variant` prop. Hover, pressed, focus and disabled work natively;
the `state` prop only forces a look so Storybook can show every state.

## Project structure

```
.storybook/              Storybook config (tokens and fonts are loaded in preview.tsx)
src/
  tokens/tokens.css      The only place where raw values live
  foundations/           MDX pages: Colors, Typography, Spacing
  components/<Name>/     Component, CSS, stories, index.ts
  icons/Icon.tsx         Icons by Figma name
  docs/                  Helpers for documentation pages and story grids
```

## Design tokens

`src/tokens/tokens.css` holds the tokens. A Figma variable `group/name` becomes `--group-name`
(`text/primary` is `--text-primary`). Components use only `var(--…)`: no hex colours or raw px values.
Spacing, radius, border width and icon size are not Figma variables; their values are taken from the components.

## Contributing

Read [AGENTS.md](AGENTS.md) first. It describes the rules for tokens, prop names, states,
accessibility and the folder structure, and the steps for adding a token or a component.
