// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=108-264
// source=src/components/TextLink/TextLink.tsx
// component=TextLink
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
// Hover, pressed and focus are real CSS states in code. Only "Disabled" becomes a prop.
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Pressed: 'pressed',
  Focus: 'focus',
  Disabled: 'disabled',
})

// Adds a prop on its own line only when it is present, so no empty lines are left in the snippet.
const line = (show: boolean, text: string) => (show ? `\n  ${text}` : '')

export default {
  example: figma.code`<TextLink
  label="${label}"${line(state === 'disabled', 'state="disabled"')}
/>`,
  imports: ['import { TextLink } from "src/components/TextLink"'],
  id: 'text-link',
  metadata: { nestable: true },
}
