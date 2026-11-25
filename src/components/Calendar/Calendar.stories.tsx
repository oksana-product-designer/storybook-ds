import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Calendar } from './Calendar';

// November 2026, as in the Figma component: today is the 2nd and the 1st is disabled.
const TODAY = new Date(2026, 10, 2);

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma components **Calendar** and **Calendar day**, built on `react-day-picker`. The week starts on Monday and the labels are English, as in Figma. ' +
          'The day states of the Figma "Calendar day" component are drawn by the calendar: Default, Hover, **Today** (blue outline), **Selected** (blue fill), **Disabled** and **Outside** (days of the neighbouring months). ' +
          'It is a `grid` and works with the keyboard (arrows, Home, End, Page Up, Page Down). The Date variant of Input opens it.',
      },
    },
  },
  args: { defaultMonth: TODAY, today: TODAY, onSelect: fn() },
  argTypes: {
    selected: { control: 'date', description: 'The selected day.' },
    defaultMonth: { control: false },
    month: { control: false },
    today: { control: false, description: 'Overrides the current date, which gets the Today state.' },
    disabled: { control: false, description: 'Days that cannot be selected, for example `{ before: new Date() }`.' },
    onSelect: { control: false },
    onMonthChange: { control: false },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { disabled: { before: TODAY } },
  play: async ({ canvas, args, userEvent }) => {
    // the day before today is disabled, a later day can be selected
    await userEvent.click(canvas.getByRole('button', { name: /November 12th, 2026/ }));
    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await userEvent.click(canvas.getByRole('button', { name: /Next month/i }));
    await expect(canvas.getByText('December 2026')).toBeVisible();
  },
};

export const WithSelectedDay: Story = {
  args: { selected: new Date(2026, 10, 12) },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('gridcell', { selected: true })).toBeVisible();
  },
};

export const WithDisabledDays: Story = {
  args: { disabled: { before: TODAY } },
};
