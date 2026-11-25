// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=334-9570
// source=src/components/Popover/Popover.tsx
// component=Popover
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<Popover text="${text}" />`,
  imports: ['import { Popover } from "src/components/Popover"'],
  id: 'popover',
  metadata: { nestable: true },
}
