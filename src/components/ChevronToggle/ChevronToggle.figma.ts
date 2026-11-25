// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=108-252
// source=src/components/ChevronToggle/ChevronToggle.tsx
// component=ChevronToggle
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('State', {
  Open: 'open',
  Closed: 'closed',
})

export default {
  example: figma.code`<ChevronToggle state="${state}" />`,
  imports: ['import { ChevronToggle } from "src/components/ChevronToggle"'],
  id: 'chevron-toggle',
  metadata: { nestable: true },
}
