import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { ButtonGroup } from './ButtonGroup';
import { ButtonGroupItem } from './ButtonGroupItem';
import { Logo } from '../Logo';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma components **Button group** and **Button group item**. The group is the Figma "Options" slot: ' +
          'put `ButtonGroupItem` elements inside it. Items have equal width and a gap between them.\n\n' +
          'Figma has only `Selected` and no selection rules, so the behaviour is ours. By default the group is a **radio group** ' +
          '(one choice, arrow keys move and select, one tab stop). With `multiple` every item is an independent **toggle button** (`aria-pressed`). ' +
          'Selection lives on the group (`value`, `defaultValue`, `onChange`); each item has a `value`. ' +
          'The group needs an accessible name: pass `aria-label` or `aria-labelledby`.\n\n' +
          'Item `content="logo"` shows the `logo` slot: pass a `Logo` (see Components/Logo). A placeholder is drawn when no logo is passed.',
      },
    },
  },
  args: {
    'aria-label': 'Options',
    multiple: false,
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Not in Figma. Off: one choice (radio group). On: independent toggle buttons.',
    },
    disabled: { control: 'boolean', description: 'Disables every item.' },
    value: { control: false, description: 'Controlled selection. A string, or a string array with `multiple`.' },
    defaultValue: { control: false, description: 'Initial selection when the group is uncontrolled.' },
    onChange: { control: false, description: 'Called with the new value (string, or string array with `multiple`).' },
    children: { control: false, description: 'The "Options" slot: `ButtonGroupItem` elements.' },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Button group usage", first group: two options. */
export const Playground: Story = {
  args: { defaultValue: 'no' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="no" label="No I’don’t" />
      <ButtonGroupItem value="yes" label="Yes, I have" />
    </ButtonGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const no = canvas.getByRole('radio', { name: /no i/i });
    const yes = canvas.getByRole('radio', { name: /yes/i });
    await expect(no).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(yes);
    await expect(yes).toHaveAttribute('aria-checked', 'true');
    await expect(no).toHaveAttribute('aria-checked', 'false');
    // radio pattern: the arrow key moves focus and selection
    await userEvent.keyboard('{ArrowLeft}');
    await expect(no).toHaveAttribute('aria-checked', 'true');
    await expect(no).toHaveFocus();
  },
};

/** Figma "Button group usage", second group: icons on the items. */
export const WithIcons: Story = {
  args: { defaultValue: 'day' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="day" label="Day" showLeadingIcon />
      <ButtonGroupItem value="week" label="Week" />
      <ButtonGroupItem value="month" label="Month" showTrailingIcon />
    </ButtonGroup>
  ),
};

/** Figma "Button group usage", third group: four options, the last one disabled. */
export const WithDisabledItem: Story = {
  args: { defaultValue: 'one' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="one" label="One" />
      <ButtonGroupItem value="two" label="Two" />
      <ButtonGroupItem value="three" label="Three" />
      <ButtonGroupItem value="four" label="Four" disabled />
    </ButtonGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('radio', { name: 'Four' })).toBeDisabled();
  },
};

/** `multiple`: every item toggles on its own. */
export const Multiple: Story = {
  args: { multiple: true, defaultValue: ['week'] },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="day" label="Day" />
      <ButtonGroupItem value="week" label="Week" />
      <ButtonGroupItem value="month" label="Month" />
    </ButtonGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const day = canvas.getByRole('button', { name: 'Day' });
    const week = canvas.getByRole('button', { name: 'Week' });
    await expect(week).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(day);
    await expect(day).toHaveAttribute('aria-pressed', 'true');
    await expect(week).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(week);
    await expect(week).toHaveAttribute('aria-pressed', 'false');
  },
};

/** Item content `logo`, with the logos exported from Figma. */
export const WithLogos: Story = {
  args: { defaultValue: 'paypal', 'aria-label': 'Payment method' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="paypal" content="logo" logo={<Logo name="paypal" />} aria-label="PayPal" />
      <ButtonGroupItem value="paypal-credit" content="logo" logo={<Logo name="paypal-credit" />} aria-label="PayPal Credit" />
      <ButtonGroupItem value="gpay" content="logo" logo={<Logo name="gpay" />} aria-label="Google Pay" />
    </ButtonGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'day' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="day" label="Day" />
      <ButtonGroupItem value="week" label="Week" />
    </ButtonGroup>
  ),
};

/** Controlled group: the parent owns the value. */
export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [value, setValue] = useState('week');
    return (
      <div style={{ display: 'grid', gap: 'var(--space-16)', fontFamily: 'var(--font-family)' }}>
        <ButtonGroup aria-label={args['aria-label']} value={value} onChange={setValue}>
          <ButtonGroupItem value="day" label="Day" />
          <ButtonGroupItem value="week" label="Week" />
          <ButtonGroupItem value="month" label="Month" />
        </ButtonGroup>
        <span>Selected: {value}</span>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('radio', { name: 'Month' }));
    await expect(canvas.getByText('Selected: month')).toBeVisible();
  },
};
