// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=335-9718
// source=src/components/Select/SelectMenu.tsx
// component=SelectMenu
import figma from 'figma'
const instance = figma.selectedInstance

// The "Options" slot holds the Select options.
const options = instance.getSlot('Options')

// aria-label is a placeholder: the listbox needs an accessible name in code.
export default {
  example: figma.code`<SelectMenu aria-label="Options">
  ${options}
</SelectMenu>`,
  imports: ['import { SelectMenu } from "src/components/Select"'],
  id: 'select-menu',
  metadata: { nestable: true },
}
