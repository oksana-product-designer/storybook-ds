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

const props = figma.code`variant="${variant}"
  label="${label}"
  ${required ? '' : 'required={false}'}
  ${infoIcon ? 'infoIcon' : ''}
  ${showHelperText ? figma.code`showHelperText helperText="${helperText}"` : ''}
  ${state === 'error' ? figma.code`state="error" errorMessage="${errorMessage}"` : ''}
  ${state === 'success' ? figma.code`state="success" successMessage="${successMessage}"` : ''}
  ${state === 'disabled' ? 'disabled' : ''}`

const text =
  variant === 'text' || variant === 'date'
    ? isEmptyState
      ? figma.code`placeholder="${value}"`
      : figma.code`defaultValue="${value}"`
    : ''

// The "Chips" slot holds the selected chips of the multi-select.
const chips = instance.getSlot('Chips')

let example
if (variant === 'select') {
  example = figma.code`<Input
  ${props}
>
  <option value="">${value}</option>
</Input>`
} else if (variant === 'multi-select') {
  example = figma.code`<Input
  ${props}
  ${isEmptyState ? figma.code`placeholder="${value}"` : ''}
>
  ${chips}
</Input>`
} else {
  example = figma.code`<Input
  ${props}
  ${text}
/>`
}

export default {
  example,
  imports: ['import { Input } from "src/components/Input"'],
  id: 'input',
  metadata: { nestable: true },
}
