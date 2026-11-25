// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=87-123
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')

// Figma "Type" is the "variant" prop in code.
const variant = instance.getEnum('Type', {
  Primary: 'primary',
  Secondary: 'secondary',
  Link: 'link',
  'Link accent': 'link-accent',
  'Link danger': 'link-danger',
})
const size = instance.getEnum('Size', {
  Small: 'small',
  Default: 'default',
})
// Hover, pressed and focus are real CSS states in code. Only "Disabled" becomes a prop.
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Pressed: 'pressed',
  Focus: 'focus',
  Disabled: 'disabled',
})

const showLeadingIcon = instance.getBoolean('Show leading icon')
const showTrailingIcon = instance.getBoolean('Show trailing icon')

let leadingIconCode
if (showLeadingIcon) {
  const icon = instance.getInstanceSwap('Leading icon')
  if (icon && icon.type === 'INSTANCE') {
    leadingIconCode = icon.executeTemplate().example
  }
}

let trailingIconCode
if (showTrailingIcon) {
  const icon = instance.getInstanceSwap('Trailing icon')
  if (icon && icon.type === 'INSTANCE') {
    trailingIconCode = icon.executeTemplate().example
  }
}

// Adds a prop on its own line only when it is present, so no empty lines are left in the snippet.
const line = (show: boolean, text: string) => (show ? `\n  ${text}` : '')

// A section (the icon snippet) needs its own line break, added only when the section exists.
const leadingBreak = leadingIconCode ? '\n  ' : ''
const trailingBreak = trailingIconCode ? '\n  ' : ''

export default {
  example: figma.code`<Button
  variant="${variant}"${line(size === 'small', 'size="small"')}
  label="${label}"${line(showLeadingIcon, 'showLeadingIcon')}${leadingBreak}${leadingIconCode ? figma.code`leadingIcon={${leadingIconCode}}` : ''}${line(showTrailingIcon, 'showTrailingIcon')}${trailingBreak}${trailingIconCode ? figma.code`trailingIcon={${trailingIconCode}}` : ''}${line(state === 'disabled', 'disabled')}
/>`,
  imports: ['import { Button } from "src/components/Button"'],
  id: 'button',
  metadata: { nestable: true },
}
