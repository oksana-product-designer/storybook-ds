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

// Adds a prop on its own line only when it is present, so no empty lines are left in the snippet.
const line = (show: boolean, text: string) => (show ? `\n  ${text}` : '')

export default {
  example: figma.code`<Checkbox
  label="${label}"${line(!showLabel, 'showLabel={false}')}${line(!!checked, 'defaultChecked')}${line(!!description, 'description')}${line(!!description, `descriptionText="${descriptionText}"`)}${line(state === 'error', 'state="error"')}${line(state === 'error', `errorMessage="${errorMessage}"`)}${line(state === 'disabled', 'disabled')}${line(showTitle, `showTitle title="${title}"`)}${line(showTitle && titleRequired, 'titleRequired')}${line(showTitle && titleInfoIcon, 'titleInfoIcon')}
/>`,
  imports: ['import { Checkbox } from "src/components/Checkbox"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
