import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ButtonGroupItem, type ButtonGroupItemState } from './ButtonGroupItem';
import { StoryMatrix } from '../../docs/StoryMatrix';

const STATES: ButtonGroupItemState[] = ['default', 'hover', 'pressed', 'focus', 'disabled'];

const meta = {
  title: 'Components/ButtonGroupItem',
  component: ButtonGroupItem,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Button group item** (`Content`, `Selected`, `State`). It lives inside a `ButtonGroup`, which owns the selection. ' +
          'Used on its own it is a toggle button driven by the `selected` prop. ' +
          'The Figma `Content=Logo` item takes a `logo` and has less vertical padding; a placeholder is drawn when no logo is passed.',
      },
    },
  },
  args: {
    content: 'text',
    label: 'Label',
    selected: false,
    state: 'default',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  argTypes: {
    content: { control: 'inline-radio', options: ['text', 'logo'], description: 'Figma property `Content`.' },
    selected: { control: 'boolean', description: 'Figma property `Selected`. Inside a group it comes from the group.' },
    state: {
      control: 'select',
      options: STATES,
      description: 'Figma property `State`. Forces a visual state; `disabled` also disables the item.',
    },
    label: { control: 'text', description: 'Text of the `text` content.' },
    value: { control: 'text', description: 'Identifies the item inside the group.' },
    showLeadingIcon: { control: 'boolean' },
    showTrailingIcon: { control: 'boolean' },
    leadingIcon: { control: false, description: 'Replaces the default leading icon (check).' },
    trailingIcon: { control: false, description: 'Replaces the default trailing icon (arrow-right).' },
    logo: { control: false, description: 'The logo for `content="logo"`. A placeholder is drawn when empty.' },
  },
} satisfies Meta<typeof ButtonGroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Selected: Story = {
  args: { selected: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Label' })).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Logo: Story = { args: { content: 'logo' } };

const ROWS = ['text', 'text selected', 'logo', 'logo selected'] as const;

/** Every Content x Selected x State, as in the Figma "Button group item" frame. */
export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <StoryMatrix rows={ROWS} cols={STATES} colWidth="minmax(160px, 1fr)">
      {(row, state) => (
        <div style={{ width: '100%', display: 'flex' }}>
          <ButtonGroupItem
            {...args}
            content={row.startsWith('logo') ? 'logo' : 'text'}
            selected={row.endsWith('selected')}
            state={state}
          />
        </div>
      )}
    </StoryMatrix>
  ),
};
