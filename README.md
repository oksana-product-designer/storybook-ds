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

## Chromatic

Storybook is published to [Chromatic](https://www.chromatic.com) by the GitHub Action in
`.github/workflows/chromatic.yml` on every push to `main` and on pull requests.

1. Sign in to Chromatic with GitHub and add this repository as a project.
2. Copy the project token and save it as the repository secret `CHROMATIC_PROJECT_TOKEN`
   (Settings, Secrets and variables, Actions).
3. Push. The first build becomes the visual baseline.

To publish by hand: `CHROMATIC_PROJECT_TOKEN=<token> npm run chromatic`.

## Figma Code Connect

Every component has a Code Connect template next to it (`Button.figma.ts`, `Input.figma.ts`, ...), plus one per icon in
`src/icons/figma/`. In Figma Dev Mode they show a snippet with the real props instead of generated CSS.
The templates map Figma properties to props (Figma `Type` is `variant`); hover, pressed and focus are CSS states,
so only `Disabled` and `Error` become props.

Needs a Figma Organization or Enterprise plan and the components published in the team library.

```bash
FIGMA_ACCESS_TOKEN=<token> npm run figma:publish
```

Create the token in Figma (Settings, Security, Personal access tokens) with the scopes *File content: Read*
and *Code Connect: Write*. `npx figma connect publish --dry-run` lists what would be published without a token call.

## What is inside

**Foundations**: Colors, Typography and Spacing (read from the tokens, never copied), Icons and Logos.

**Components**: Button, ButtonGroup (with ButtonGroupItem), Input (text, select, date, multi-select), Checkbox, Tag, Chip,
TextLink, Divider, ChevronToggle, Popover (with InfoPopover), SelectMenu (with SelectOption), Calendar and Logo (shown on Foundations / Logos).
Every component has stories for all Figma variants and states, with autodocs. The icons and the logos have their own pages (Foundations / Icons and Foundations / Logos).

| Component | Figma component | Main props |
|---|---|---|
| Button | Button | `variant`, `size`, `state`, `label`, icons |
| ButtonGroup | Button group, Button group item | `value`, `onChange`, `multiple`, item `content`, `selected`, `state` |
| Input | Input field | `variant`, `state`, `label`, `options`, `value`, `onValueChange`, helper, error and success text, `infoText` |
| Checkbox | Checkbox | `checked`, `state`, `description`, `label`, `titleInfoText` |
| Tag | Badge | `variant`, `label`, `showIcon` |
| Chip | Chip | `variant`, `state`, `label`, `onRemove` |
| TextLink | Text link | `label`, `state`, `href` |
| Divider | Divider | none |
| ChevronToggle | Chevron toggle | `state` |
| Popover | Popover | `text`; `InfoPopover` is the info icon that opens it |
| SelectMenu | Select menu, Select option | `multiple`; option `label`, `state`, `badge`, `secondBadge` |
| Calendar | Calendar, Calendar day | `selected`, `onSelect`, `disabled`, `defaultMonth` |
| Logo | Logo / PayPal, PayPal Credit, G Pay, TVP, Affiliate | `name` |

The Input opens the Select menu, the Calendar and the Chips itself. The Calendar is built on `react-day-picker`.
The logos are exported from Figma into `src/assets/logos`.

Figma `Type` is the `variant` prop. Hover, pressed, focus and disabled work natively;
the `state` prop only forces a look so Storybook can show every state.

## Project structure

```
.storybook/              Storybook config (tokens and fonts are loaded in preview.tsx)
src/
  tokens/tokens.css      The only place where raw values live
  foundations/           MDX pages: Colors, Typography, Spacing, Icons, Logos
  components/<Name>/     Component, CSS, stories, index.ts
  icons/Icon.tsx         Icons by Figma name
  assets/logos/          Logos exported from Figma
  docs/                  Helpers for documentation pages and story grids
```

## Design tokens

`src/tokens/tokens.css` holds the tokens. A Figma variable `group/name` becomes `--group-name`
(`text/primary` is `--text-primary`). Components use only `var(--…)`: no hex colours or raw px values.
Spacing, radius, border width and icon size are not Figma variables; their values are taken from the components.

## Contributing

Read [AGENTS.md](AGENTS.md) first. It describes the rules for tokens, prop names, states,
accessibility and the folder structure, and the steps for adding a token or a component.
