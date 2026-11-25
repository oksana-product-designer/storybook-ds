// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=204-9930
// source=src/components/Chip/Chip.tsx
// component=Chip
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
// Figma "Type" is the "variant" prop in code.
const variant = instance.getEnum('Type', {
  Removable: 'removable',
  Static: 'static',
})
// Hover is a real CSS state in code. Only "Disabled" becomes a prop.
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Disabled: 'disabled',
})

// Adds a prop on its own line only when it is present, so no empty lines are left in the snippet.
const line = (show: boolean, text: string) => (show ? `\n  ${text}` : '')

export default {
  example: figma.code`<Chip
  variant="${variant}"
  label="${label}"${line(state === 'disabled', 'state="disabled"')}
/>`,
  imports: ['import { Chip } from "src/components/Chip"'],
  id: 'chip',
  metadata: { nestable: true },
}
