import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor } from 'storybook/test';
import { Input, type InputOption, type InputState, type InputVariant } from './Input';
import { Tag } from '../Tag';
import { StoryMatrix } from '../../docs/StoryMatrix';

const VARIANTS: InputVariant[] = ['text', 'select', 'date', 'multi-select'];
const STATES: InputState[] = ['default', 'hover', 'focus', 'filled', 'error', 'disabled', 'success'];

/** The processing-speed options from the Figma "Select menu". */
const OPTIONS: InputOption[] = [
  { value: '2d', label: '2 Days', badge: <Tag variant="brand" showIcon={false} label="Fastest" /> },
  { value: '1w', label: '1 Weeks' },
  { value: '2w', label: '2 Weeks', secondBadge: <Tag variant="success" showIcon={false} label="Recommended" /> },
  { value: '4w', label: '4 Weeks', badge: <Tag variant="brand" showIcon={false} label="Cheapest" /> },
];

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Input field**. Figma `Type` is the `variant` prop.\n\n' +
          '- **text**: a native input. Use `value` or `defaultValue` and the native `onChange`.\n' +
          '- **select**: a combobox that opens the **Select menu** (Components/SelectMenu) with the `options`. Keyboard: arrows, Home, End, Enter, Escape. `onValueChange` gets the chosen value.\n' +
          '- **multi-select**: the same menu with several choices; the chosen options are shown as **Chips** that can be removed. `value` is an array.\n' +
          '- **date**: a text field for `DD.MM.YYYY` plus the **Calendar**, opened from the calendar icon or with the arrow down key. `value` is `YYYY-MM-DD`.\n\n' +
          'The info icon (`infoIcon`) opens an **InfoPopover** when `infoText` is set. ' +
          'Hover and focus work natively; `state` forces a look, which is how the state grids are drawn.',
      },
    },
  },
  args: {
    variant: 'text',
    state: 'default',
    label: 'Label',
    required: true,
    infoIcon: false,
    showHelperText: false,
    helperText: 'Helper text',
    errorMessage: 'Error message',
    successMessage: 'Success message',
    placeholder: 'Text',
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Figma property `Type`.' },
    state: {
      control: 'select',
      options: STATES,
      description: 'Figma property `State`. `error` and `success` show their message; `disabled` disables the field.',
    },
    label: { control: 'text', description: 'Label above the field.' },
    required: { control: 'boolean', description: 'Shows the red asterisk and marks the field required.' },
    infoIcon: { control: 'boolean', description: 'Info icon on the right of the label row.' },
    infoText: { control: 'text', description: 'Text of the info popover. Without it the icon has no popover.' },
    showHelperText: { control: 'boolean', description: 'Show `helperText` under the field.' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text', description: 'Shown when `state` is `error`.' },
    successMessage: { control: 'text', description: 'Shown when `state` is `success`.' },
    placeholder: { control: 'text', description: 'Text shown while the field is empty.' },
    inputType: { control: 'text', description: 'Native input type for the `text` variant (email, tel, ...).' },
    options: { control: false, description: 'The choices of `select` and `multi-select`: `{ value, label, badge?, secondBadge? }`.' },
    value: { control: false, description: 'Controlled value. String, `YYYY-MM-DD` for date, array for multi-select.' },
    defaultValue: { control: false, description: 'Initial value of an uncontrolled field.' },
    onValueChange: { control: false, description: 'Value callback of `select`, `date` and `multi-select`.' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByLabelText(/label/i);
    await userEvent.type(field, 'Hello');
    await expect(field).toHaveValue('Hello');
  },
};

export const Text: Story = { args: { variant: 'text' } };

export const Select: Story = {
  args: { variant: 'select', placeholder: 'Select', options: OPTIONS, onValueChange: fn() },
  play: async ({ canvas, args, userEvent }) => {
    const field = canvas.getByRole('combobox', { name: /label/i });
    await expect(field).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(field);
    await expect(field).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(await canvas.findByRole('option', { name: /2 Weeks/ }));
    await expect(field).toHaveTextContent('2 Weeks');
    await expect(args.onValueChange).toHaveBeenCalledWith('2w');
    await waitFor(() => expect(canvas.queryByRole('listbox')).toBeNull());
  },
};

/** The same field operated with the keyboard only. */
export const SelectWithKeyboard: Story = {
  args: { variant: 'select', placeholder: 'Select', options: OPTIONS },
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByRole('combobox', { name: /label/i });
    field.focus();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    await expect(field).toHaveTextContent('1 Weeks');
    await userEvent.keyboard('{ArrowDown}{Escape}');
    await expect(field).toHaveAttribute('aria-expanded', 'false');
  },
};

export const MultiSelect: Story = {
  args: { variant: 'multi-select', placeholder: 'Select options', options: OPTIONS, onValueChange: fn() },
  play: async ({ canvas, args, userEvent }) => {
    const field = canvas.getByRole('combobox', { name: /label/i });
    await userEvent.click(field);
    await userEvent.click(await canvas.findByRole('option', { name: /2 Days/ }));
    await userEvent.click(await canvas.findByRole('option', { name: /4 Weeks/ }));
    await expect(args.onValueChange).toHaveBeenLastCalledWith(['2d', '4w']);
    // chosen options are chips, and a chip can be removed
    await userEvent.click(canvas.getByRole('button', { name: 'Remove 2 Days' }));
    await expect(args.onValueChange).toHaveBeenLastCalledWith(['4w']);
    await expect(canvas.queryByRole('button', { name: 'Remove 2 Days' })).toBeNull();
  },
};

export const MultiSelectFilled: Story = {
  args: { variant: 'multi-select', options: OPTIONS, defaultValue: ['2d', '2w'] },
};

export const Date: Story = {
  args: { variant: 'date', placeholder: 'DD.MM.YYYY', onValueChange: fn() },
  play: async ({ canvas, args, userEvent }) => {
    const field = canvas.getByLabelText(/label/i);
    await userEvent.type(field, '25.12.2026{Enter}');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('2026-12-25');
    // the calendar opens from the icon and shows the typed month
    await userEvent.click(canvas.getByRole('button', { name: 'Open calendar' }));
    await expect(await canvas.findByText('December 2026')).toBeVisible();
  },
};

export const WithInfoPopover: Story = {
  args: { infoIcon: true, infoText: 'We send your order confirmation and receipt to this address.' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole('button', { name: 'More information' }));
    await expect(await canvas.findByRole('tooltip')).toHaveTextContent('order confirmation');
  },
};

export const WithHelperText: Story = { args: { showHelperText: true } };
export const Optional: Story = { args: { required: false, label: 'Label (optional)' } };
export const WithInfoIcon: Story = { args: { infoIcon: true } };

export const Error: Story = {
  args: { state: 'error', defaultValue: 'Text' },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByLabelText(/label/i)).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toHaveTextContent(args.errorMessage as string);
  },
};

export const Success: Story = { args: { state: 'success', defaultValue: 'Text' } };

export const Disabled: Story = {
  args: { state: 'disabled' },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/label/i)).toBeDisabled();
  },
};

/** Every Type x State, as in the Figma component frame. */
export const AllStates: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <StoryMatrix rows={VARIANTS} cols={STATES} colWidth="minmax(200px, 1fr)">
      {(variant, state) => {
        const filled = state === 'filled' || state === 'error' || state === 'success';
        return (
          <div style={{ width: '100%' }}>
            <Input
              {...args}
              variant={variant}
              state={state}
              placeholder={variant === 'select' ? 'Select' : variant === 'multi-select' ? 'Select options' : 'Text'}
              options={OPTIONS}
              defaultValue={
                !filled
                  ? undefined
                  : variant === 'select'
                    ? '2w'
                    : variant === 'multi-select'
                      ? ['2d', '2w']
                      : variant === 'date'
                        ? '2026-12-25'
                        : 'Value'
              }
            />
          </div>
        );
      }}
    </StoryMatrix>
  ),
};
