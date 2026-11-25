// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=89-157
// source=src/components/Checkbox/Checkbox.tsx
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const showLabel = instance.getBoolean('Show label')
const checked = instance.getEnum('Checked', { False: false, True: true })
const description = instance.getEnum('Description', { True: true, False: false })
const descriptionText = instance.getString('Description text')
const errorMessage = instance.getString('Error message')

const showTitle = instance.getBoolean('Show title')
const title = instance.getString('Title')
const titleRequired = instance.getBoolean('Title required')
const titleInfoIcon = instance.getBoolean('Title info icon')

// Hover and focus are real CSS states in code. Only "Disabled" and "Error" become props.
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
  Disabled: 'disabled',
  Error: 'error',
})

export default {
  example: figma.code`<Checkbox
  label="${label}"
  ${showLabel ? '' : 'showLabel={false}'}
  ${checked ? 'defaultChecked' : ''}
  ${description ? 'description' : ''}
  ${description ? figma.code`descriptionText="${descriptionText}"` : ''}
  ${state === 'error' ? 'state="error"' : ''}
  ${state === 'error' ? figma.code`errorMessage="${errorMessage}"` : ''}
  ${state === 'disabled' ? 'disabled' : ''}
  ${showTitle ? figma.code`showTitle title="${title}"` : ''}
  ${showTitle && titleRequired ? 'titleRequired' : ''}
  ${showTitle && titleInfoIcon ? 'titleInfoIcon' : ''}
/>`,
  imports: ['import { Checkbox } from "src/components/Checkbox"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
