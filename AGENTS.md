# AGENTS.md

Design system for the "TVP | Checkout flow" Figma file (key `4cN2sjeRxYOB0Tfjh6gRKr`, page "Components").
Stack: Vite + React 19 + TypeScript, Storybook 10, plain CSS on CSS variables. No Tailwind, no CSS-in-JS.

## Commands

```bash
npm run storybook        # dev server on http://localhost:6006
npm run build-storybook  # production build, must pass before you finish
npx tsc -p tsconfig.app.json --noEmit   # type check, must pass
npx vitest --project storybook run      # runs every story and its play function in Chromium, must pass
```

Stories are tagged `ai-generated`. Exactly one `CssCheck` story exists (`Button`), which proves that `tokens.css` reached the component. Do not add another one.

## Rules

### 1. Tokens only, from variables

- Every colour, spacing, radius, border width, icon size, shadow and text style in a component or story comes from a custom property in `src/tokens/tokens.css`: `var(--text-primary)`, `var(--space-8)`.
- Never write a hex, `rgb()`, `hsl()` or a raw `px`/`rem` value in component CSS or inline styles. If a value has no token, add the token first (see "Adding or changing tokens"), then use it.
- Never invent a token name in a component. If `var(--foo)` is not declared in `tokens.css`, it is a bug.
- Need a variation of a token (for example 75% of a colour)? Derive it from the token: `color-mix(in srgb, var(--border-strong) 75%, transparent)`. Do not paste the resulting colour.
- Borders are drawn inset with `box-shadow: inset 0 0 0 var(--border-width-*) <colour>` so that a state change never resizes the component, as in Figma.
- Allowed exceptions: `0`, `100%`, `inherit`, `currentColor`, `transparent`, unitless line-heights, and the layout-only styles of documentation helpers in `src/docs/`.

### 2. Token names repeat Figma

- Figma variable `group/name` becomes `--group-name`: `text/primary` is `--text-primary`, `surface/danger-subtle` is `--surface-danger-subtle`.
- Text styles are split into `--<style>-font-size`, `-line-height`, `-font-weight`, `-letter-spacing`: `body/regular` gives `--body-regular-font-size` and so on. Figma letter-spacing is a percentage, so it is written in `em` (`-2` is `-0.02em`).
- Read values from Figma with the Figma MCP (`get_variable_defs`, `get_design_context`). Do not copy values from screenshots.
- Figma may return a variable as an opaque hex while the component applies opacity to the fill. Check the component (`get_design_context`) before you trust a value. Record the effective value and keep the raw Figma value in a comment, as `tokens.css` already does.
- Figma has no variables for spacing, radius, border width or icon size. Those tokens (`--space-*`, `--radius-*`, `--border-width-*`, `--icon-size-*`) are ours, taken from component values. Do not present them as Figma variables.

### 3. Prop names repeat Figma component properties

- A prop corresponds to a Figma component property. Figma `State` is `state`, `Size` is `size`, `Checked` is `checked`, `Description` is `description`, and so on, in camelCase.
- The one deliberate rename: Figma `Type` is `variant`. It avoids a clash with the HTML `type` attribute.
- Values are lowercase kebab-case versions of the Figma values: `Link accent` is `'link-accent'`, `Multi-select` is `'multi-select'`.
- Boolean properties and text properties keep the Figma name: `showLeadingIcon`, `showHelperText`, `helperText`, `errorMessage`, `titleRequired`.
- Instance-swap properties are `ReactNode` props: `leadingIcon`, `trailingIcon`.
- Do not add a prop that does not exist in Figma without a reason. When you must (for example `inputType`), document why in the prop description.
- Each variant prop is exported as a union type next to the component: `ButtonVariant`, `InputState`, and so on.
- Component props extend the native element props (`ComponentPropsWithRef<'input'>`), so `className`, `onChange`, `aria-*` and `ref` work. Remove native props that clash with Figma names (`type`, `title`, `children`) with `Omit`.

### 4. State

- Real `:hover`, `:active`, `:focus-visible` and `:disabled` must work without any prop.
- The `state` prop only forces a look, so Storybook can show every state. Style both the pseudo-class and the attribute: `.x:hover, .x[data-state='hover']`.
- `state="disabled"` must also set the native `disabled` attribute. `state="error"` must set `aria-invalid` and show the message with `role="alert"`.
- Components expose their props to CSS as `data-variant`, `data-size`, `data-state`. Class names use the `ds-` prefix (`ds-button`, `ds-button__label`).

### 5. Accessibility

- Use native elements: `button`, `input`, `select`, `label`. Keep keyboard and screen reader behaviour native.
- Every control has an accessible name. When a visible label is hidden (`showLabel={false}`), fall back to `aria-label`.
- Icons are decorative: `aria-hidden`. Colour always comes from `currentColor` via a token on the parent.
- The a11y addon is on. Do not leave violations in new stories.

## Figma Code Connect

- Each component has a `<Name>.figma.ts` template next to it, and each icon has one in `src/icons/figma/`. They are parserless templates (`figma.code`), never `.figma.tsx` or `figma.connect()`.
- When you add or rename a component, a prop or a prop value, update its template in the same change. A template may only use props that exist in the component.
- Map every Figma property: `getEnum` must list every Figma value, text and boolean properties use `getString` and `getBoolean`, icon properties use `getInstanceSwap` with `executeTemplate()`. Never hardcode child content.
- Hover, pressed and focus are CSS states in code, so they are not written as props. Disabled and error are.
- Publish with `FIGMA_ACCESS_TOKEN=<token> npm run figma:publish`. Check first with `npx figma connect publish --dry-run`. Never write the token into a file.

## Folder structure

```
.storybook/
  main.ts                 # addons: docs, a11y, vitest
  preview.tsx             # imports tokens.css and the fonts, enables autodocs
src/
  tokens/
    tokens.css            # the only place where raw values live
  foundations/            # MDX pages: Colors, Typography, Spacing (read from tokens.css), Icons, Logos
  docs/                   # helpers for documentation pages and story grids (not part of the library)
    tokens.ts             # parses tokens.css, so pages never duplicate values
    StoryMatrix.tsx       # variant x state grid for stories
  icons/
    Icon.tsx              # icons by Figma name (lucide/..., icon/...), colour is currentColor
    figma/                # Code Connect templates, one per icon
  assets/
    logos/                # logos exported from Figma (PayPal, PayPal Credit, G Pay, TVP)
  components/
    <Name>/
      <Name>.tsx          # component and exported prop types
      <Name>.css          # styles, tokens only, ds- prefix
      <Name>.stories.tsx  # stories
      index.ts            # public exports
```

- One folder per component, named as the Figma component in PascalCase. Tag is built from the Figma component Badge.
- Import from the component folder (`./Button`), not from the file inside it.
- Documentation helpers live in `src/docs/`. Do not import them from components.

## Adding or changing tokens

1. Read the variable in Figma. Check opacity on a component that uses it.
2. Add it to `src/tokens/tokens.css` in the matching group, with a comment when the value is derived or unverified.
3. The Colors, Typography and Spacing pages update by themselves, because they parse `tokens.css`. Check them in Storybook.

## Adding a component

1. Read the Figma component set (`get_metadata`, then `get_design_context`) and list its properties and states.
2. Create `src/components/<Name>/` with the four files above. Props follow rule 3, styles follow rule 1.
3. Write stories: a `Playground` with controls, one story per variant, and an "All states" story built with `StoryMatrix` that covers every Figma combination. Autodocs is on globally; add `argTypes` descriptions (mention the Figma property) and a `parameters.docs.description.component` text.
4. Run the type check and `npm run build-storybook`. Open the stories in the browser and compare them with the Figma frame.

## Definition of done

- No colour or size literals in the component CSS (`grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(|[0-9]px" src/components/*/*.css` returns nothing except comments).
- Type check and Storybook build pass.
- Every Figma variant and state has a story.
- Prop names and values follow rule 3.

## Not in the library yet

Step marker, Step, Step navigation, Trust badge, Assurance item, Section header, Form row, Form section, Card,
Corporate account, Accordion header, Summary row, Summary group, Order summary, Summary sidebar, Promo form, Discount code, Pricing card,
Affiliate banner, Confirmation dialog, Order placed card, Top bar and Header, and the checkout pages. Figma "Calendar day" has no separate
component: the Calendar draws its day states.

Notes on the parts that are not plain Figma copies:
- Select, Multi-select and Date in `Input` are built by us: the Figma file only draws the closed field and the open menu or calendar.
- The Calendar uses `react-day-picker` (week starts on Monday, English labels, as in Figma).
- Icons and logos are shown on Foundations pages (Icons, Logos), not as component stories. Logos are real files in `src/assets/logos`. Figma "Logo / Affiliate" is a grey placeholder block, so `Logo name="affiliate"` is the same block.
