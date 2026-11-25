// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=88-169
// source=src/components/Input/Input.tsx
// component=Input
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const required = instance.getBoolean('Required')
const infoIcon = instance.getBoolean('Info icon')
const value = instance.getString('Value')
const showHelperText = instance.getBoolean('Show helper text')
const helperText = instance.getString('Helper text')
const errorMessage = instance.getString('Error message')
const successMessage = instance.getString('Success message')

// Figma "Type" is the "variant" prop in code.
const variant = instance.getEnum('Type', {
  Text: 'text',
  Select: 'select',
  Date: 'date',
  'Multi-select': 'multi-select',
})
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
  Filled: 'filled',
  Error: 'error',
  Disabled: 'disabled',
  Success: 'success',
})

// In Default, Hover and Focus the Figma "Value" is the empty-field text. In the other states it is the content.
const isEmptyState = state === 'default' || state === 'hover' || state === 'focus'

// Adds a prop on its own line only when it is present, so no empty lines are left in the snippet.
const line = (show: boolean, text: string) => (show ? `\n  ${text}` : '')

// All props are plain strings, so they can be joined without leaving empty lines.
const props =
  `variant="${variant}"` +
  line(true, `label="${label}"`) +
  line(!required, 'required={false}') +
  line(infoIcon, 'infoIcon') +
  line(showHelperText, `showHelperText helperText="${helperText}"`) +
  line(state === 'error', `state="error" errorMessage="${errorMessage}"`) +
  line(state === 'success', `state="success" successMessage="${successMessage}"`) +
  line(state === 'disabled', 'disabled')

// In Default, Hover and Focus the Figma "Value" is the empty-field text. In the other states it is the content.
const placeholder = line(isEmptyState, `placeholder="${value}"`)
const textProp =
  variant === 'text' || variant === 'date'
    ? isEmptyState
      ? placeholder
      : line(true, `defaultValue="${value}"`)
    : ''

// The "Chips" slot holds the selected chips of the multi-select. Chip has no Code Connect, so an empty or
// unconnected slot is left out instead of printing a "missing snippet" comment.
const chips = instance.getSlot('Chips')

let example
if (variant === 'select') {
  example = figma.code`<Input
  ${props}
>
  <option value="">${value}</option>
</Input>`
} else if (variant === 'multi-select' && chips && chips.connectedInstances.length > 0) {
  example = figma.code`<Input
  ${props}${placeholder}
>
  ${chips}
</Input>`
} else {
  example = figma.code`<Input
  ${props}${variant === 'multi-select' ? placeholder : textProp}
/>`
}

export default {
  example,
  imports: ['import { Input } from "src/components/Input"'],
  id: 'input',
  metadata: { nestable: true },
}
