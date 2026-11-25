// url=https://www.figma.com/design/4cN2sjeRxYOB0Tfjh6gRKr/TVP-Checkout-flow?node-id=158-5631
// source=src/components/Calendar/Calendar.tsx
// component=Calendar
import figma from 'figma'

// The Figma "Month" text is the month name the calendar draws itself, and the day states
// (Today, Disabled, Outside) come from the date and the "disabled" prop, so nothing is mapped.
export default {
  example: figma.code`<Calendar />`,
  imports: ['import { Calendar } from "src/components/Calendar"'],
  id: 'calendar',
  metadata: { nestable: true },
}
