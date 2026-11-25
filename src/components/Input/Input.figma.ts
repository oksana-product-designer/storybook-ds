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
const hasOptions = variant === 'select' || variant === 'multi-select'
const props =
  `variant="${variant}"` +
  line(true, `label="${label}"`) +
  line(!required, 'required={false}') +
  line(infoIcon, 'infoIcon') +
  line(showHelperText, `showHelperText helperText="${helperText}"`) +
  line(state === 'error', `state="error" errorMessage="${errorMessage}"`) +
  line(state === 'success', `state="success" successMessage="${successMessage}"`) +
  line(state === 'disabled', 'disabled') +
  // The options are not part of the Figma component, so the snippet refers to a list named "options".
  line(hasOptions, 'options={options}')

// In Default, Hover and Focus the Figma "Value" is the empty-field text. In the other states it is the content.
const placeholder = line(isEmptyState, `placeholder="${value}"`)
const textProp =
  variant === 'text' || variant === 'date'
    ? isEmptyState
      ? placeholder
      : line(true, `defaultValue="${value}"`)
    : placeholder

// The "Chips" slot is not written: the chips are the selected options and come from "defaultValue" in code.

export default {
  example: figma.code`<Input
  ${props}${textProp}
/>`,
  imports: ['import { Input } from "src/components/Input"'],
  id: 'input',
  metadata: { nestable: true },
}
