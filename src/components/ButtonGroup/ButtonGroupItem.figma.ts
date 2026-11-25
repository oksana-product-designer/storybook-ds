// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=95-167
// source=src/components/ButtonGroup/ButtonGroupItem.tsx
// component=ButtonGroupItem
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const content = instance.getEnum('Content', { Text: 'text', Logo: 'logo' })
const selected = instance.getEnum('Selected', { False: false, True: true })
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
if (content === 'text' && showLeadingIcon) {
  const icon = instance.getInstanceSwap('Leading icon')
  if (icon && icon.type === 'INSTANCE') {
    leadingIconCode = icon.executeTemplate().example
  }
}

let trailingIconCode
if (content === 'text' && showTrailingIcon) {
  const icon = instance.getInstanceSwap('Trailing icon')
  if (icon && icon.type === 'INSTANCE') {
    trailingIconCode = icon.executeTemplate().example
  }
}

let logoCode
if (content === 'logo') {
  const logo = instance.getInstanceSwap('Logo')
  if (logo && logo.type === 'INSTANCE') {
    logoCode = logo.executeTemplate().example
  }
}

// Inside a ButtonGroup the group owns the selection, so "selected" is not written on the item.
// The parent ButtonGroup template reads it from the metadata and writes defaultValue.
// "value" is not a Figma property: the label is used so that each item has an id.
export default {
  example: figma.code`<ButtonGroupItem
  value="${label}"
  ${content === 'logo' ? 'content="logo"' : ''}
  ${content === 'text' ? figma.code`label="${label}"` : ''}
  ${showLeadingIcon && content === 'text' ? 'showLeadingIcon' : ''}
  ${leadingIconCode ? figma.code`leadingIcon={${leadingIconCode}}` : ''}
  ${showTrailingIcon && content === 'text' ? 'showTrailingIcon' : ''}
  ${trailingIconCode ? figma.code`trailingIcon={${trailingIconCode}}` : ''}
  ${logoCode ? figma.code`logo={${logoCode}}` : ''}
  ${state === 'disabled' ? 'disabled' : ''}
/>`,
  imports: ['import { ButtonGroupItem } from "src/components/ButtonGroup"'],
  id: 'button-group-item',
  metadata: { nestable: true, props: { selected: String(selected), value: label } },
}
