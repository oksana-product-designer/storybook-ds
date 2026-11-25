// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=95-168
// source=src/components/ButtonGroup/ButtonGroup.tsx
// component=ButtonGroup
import figma from 'figma'
const instance = figma.selectedInstance

// The "Options" slot holds the Button group items.
const options = instance.getSlot('Options')

// The group owns the selection: the selected item becomes defaultValue.
let selectedValue: string | undefined
instance.findConnectedInstances((node) => node.codeConnectId() === 'button-group-item').forEach((node) => {
  const props = node.executeTemplate().metadata?.props
  if (selectedValue === undefined && props?.selected === 'true') {
    selectedValue = String(props.value)
  }
})

// aria-label is a placeholder: the group needs an accessible name in code.
export default {
  example: figma.code`<ButtonGroup
  aria-label="Options"${selectedValue !== undefined ? `\n  defaultValue="${selectedValue}"` : ''}
>
  ${options}
</ButtonGroup>`,
  imports: ['import { ButtonGroup } from "src/components/ButtonGroup"'],
  id: 'button-group',
  metadata: { nestable: true },
}
