// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=153-3288
// source=src/components/Tag/Tag.tsx
// component=Tag
// Tag is built from the Figma component "Badge".
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const showIcon = instance.getBoolean('Show icon')

// Figma "Type" is the "variant" prop in code.
const variant = instance.getEnum('Type', {
  Error: 'error',
  Success: 'success',
  Brand: 'brand',
})

export default {
  example: figma.code`<Tag
  variant="${variant}"
  label="${label}"
  ${showIcon ? '' : 'showIcon={false}'}
/>`,
  imports: ['import { Tag } from "src/components/Tag"'],
  id: 'tag',
  metadata: { nestable: true },
}
