import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Checkbox, type CheckboxState } from './Checkbox';
import { StoryMatrix } from '../../docs/StoryMatrix';

const STATES: CheckboxState[] = ['default', 'hover', 'focus', 'disabled', 'error'];

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Checkbox** (`Checked`, `State`, `Description`). ' +
          'It is a native checkbox, so keyboard and screen readers work. ' +
          'Hover and focus work natively; `state` forces a look, which is how the state grids are drawn. ' +
          'In the grids `checked` is fixed with `readOnly`; in your code use `checked` with `onChange`, or `defaultChecked`.',
      },
    },
  },
  args: {
    checked: false,
    state: 'default',
    label: 'Label',
    showLabel: true,
    description: false,
    descriptionText: 'Description text',
    errorMessage: 'Error message',
    showTitle: false,
    title: 'Title',
    titleRequired: false,
    titleInfoIcon: false,
    readOnly: true,
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Figma property `Checked`.' },
    state: {
      control: 'select',
      options: STATES,
      description: 'Figma property `State`. `error` shows `errorMessage`; `disabled` disables the checkbox.',
    },
    label: { control: 'text' },
    showLabel: { control: 'boolean', description: 'When off, the label is used as `aria-label`.' },
    description: { control: 'boolean', description: 'Figma property `Description`: show `descriptionText` under the label.' },
    descriptionText: { control: 'text' },
    errorMessage: { control: 'text', description: 'Shown when `state` is `error`.' },
    showTitle: { control: 'boolean', description: 'Show the group title row above the checkbox.' },
    title: { control: 'text' },
    titleRequired: { control: 'boolean', description: 'Red asterisk after the title.' },
    titleInfoIcon: { control: 'boolean', description: 'Info icon on the right of the title row.' },
    readOnly: { table: { disable: true } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Checked: Story = {
  args: { checked: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox', { name: /label/i })).toBeChecked();
  },
};
export const WithDescription: Story = { args: { description: true } };
export const WithTitle: Story = {
  args: { showTitle: true, titleRequired: true, titleInfoIcon: true },
};
export const Error: Story = {
  args: { state: 'error' },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toHaveTextContent(args.errorMessage as string);
  },
};
export const Disabled: Story = {
  args: { state: 'disabled' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toBeDisabled();
  },
};
export const WithoutLabel: Story = { args: { showLabel: false, label: 'Accept terms' } };

/** Interactive example: toggles with a click or the space bar. */
export const Interactive: Story = {
  args: { readOnly: false, checked: undefined, defaultChecked: false },
  play: async ({ canvas, userEvent }) => {
    const box = canvas.getByRole('checkbox', { name: /label/i });
    await expect(box).not.toBeChecked();
    await userEvent.click(box);
    await expect(box).toBeChecked();
    await userEvent.click(box);
    await expect(box).not.toBeChecked();
  },
};

const ROWS = [
  'unchecked',
  'checked',
  'unchecked + description',
  'checked + description',
] as const;

/** Every Checked x Description x State, as in the Figma component frame. */
export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <StoryMatrix rows={ROWS} cols={STATES} colWidth="minmax(200px, max-content)">
      {(row, state) => (
        <Checkbox
          {...args}
          state={state}
          checked={row.startsWith('checked')}
          description={row.endsWith('description')}
        />
      )}
    </StoryMatrix>
  ),
};
