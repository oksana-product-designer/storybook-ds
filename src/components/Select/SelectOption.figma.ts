// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=335-9717
// source=src/components/Select/SelectOption.tsx
// component=SelectOption
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
// "Active" is the keyboard highlight, hover is a real CSS state.
const state = instance.getEnum('State', {
  Default: 'default',
  Active: 'active',
  Selected: 'selected',
})

// The badges are Badge instances: they are rendered by the Tag template.
let badgeCode
if (instance.getBoolean('Show badge')) {
  const badge = instance.findInstance('Badge')
  if (badge && badge.type === 'INSTANCE') {
    badgeCode = badge.executeTemplate().example
  }
}

let secondBadgeCode
if (instance.getBoolean('Show second badge')) {
  const badge = instance.findInstance('Second badge')
  if (badge && badge.type === 'INSTANCE') {
    secondBadgeCode = badge.executeTemplate().example
  }
}

// Adds a prop on its own line only when it is present, so no empty lines are left in the snippet.
const line = (show: boolean, text: string) => (show ? `\n  ${text}` : '')
const badgeBreak = badgeCode ? '\n  ' : ''
const secondBadgeBreak = secondBadgeCode ? '\n  ' : ''

export default {
  example: figma.code`<SelectOption
  label="${label}"${line(state !== 'default', `state="${state}"`)}${badgeBreak}${badgeCode ? figma.code`badge={${badgeCode}}` : ''}${secondBadgeBreak}${secondBadgeCode ? figma.code`secondBadge={${secondBadgeCode}}` : ''}
/>`,
  imports: ['import { SelectOption } from "src/components/Select"'],
  id: 'select-option',
  metadata: { nestable: true },
}
