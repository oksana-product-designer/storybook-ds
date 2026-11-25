import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Input, type InputState, type InputVariant } from './Input';
import { StoryMatrix } from '../../docs/StoryMatrix';

const VARIANTS: InputVariant[] = ['text', 'select', 'date', 'multi-select'];
const STATES: InputState[] = ['default', 'hover', 'focus', 'filled', 'error', 'disabled', 'success'];

const options = [
  <option key="empty" value="">
    Select
  </option>,
  <option key="one" value="one">
    Option one
  </option>,
  <option key="two" value="two">
    Option two
  </option>,
];

const chips = (
  <>
    <span className="ds-doc__chip">Option one</span>
    <span className="ds-doc__chip">Option two</span>
  </>
);

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Input field**. Figma `Type` is the `variant` prop. ' +
          '`text` is a native input, `select` is a native select (pass `<option>` as children), ' +
          '`date` is a text field with a calendar icon, `multi-select` shows the chips passed as children. ' +
          'Dropdown menus and the calendar are separate Figma components and are not part of this component. ' +
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
    required: { control: 'boolean', description: 'Shows the red asterisk and sets `required`.' },
    infoIcon: { control: 'boolean', description: 'Info icon on the right of the label row.' },
    showHelperText: { control: 'boolean', description: 'Show `helperText` under the field.' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text', description: 'Shown when `state` is `error`.' },
    successMessage: { control: 'text', description: 'Shown when `state` is `success`.' },
    placeholder: { control: 'text', description: 'Text shown while the field is empty.' },
    inputType: { control: 'text', description: 'Native input type for the `text` variant (email, tel, ...).' },
    children: { control: false, description: 'Select: `<option>` elements. Multi-select: the selected chips.' },
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
  args: { variant: 'select', children: options },
  play: async ({ canvas, userEvent }) => {
    const select = canvas.getByLabelText(/label/i);
    await userEvent.selectOptions(select, 'two');
    await expect(select).toHaveValue('two');
  },
};
export const Date: Story = { args: { variant: 'date', placeholder: 'DD.MM.YYYY' } };
export const MultiSelect: Story = {
  args: { variant: 'multi-select', placeholder: 'Select options', children: undefined },
};
export const MultiSelectFilled: Story = {
  args: { variant: 'multi-select', state: 'filled', children: chips },
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
              placeholder={variant === 'select' ? 'Select' : 'Text'}
              defaultValue={filled && (variant === 'text' || variant === 'date') ? 'Value' : undefined}
            >
              {variant === 'select' ? options : variant === 'multi-select' && filled ? chips : undefined}
            </Input>
          </div>
        );
      }}
    </StoryMatrix>
  ),
};
