import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Chip, type ChipState, type ChipVariant } from './Chip';
import { StoryMatrix } from '../../docs/StoryMatrix';

const VARIANTS: ChipVariant[] = ['removable', 'static'];
const STATES: ChipState[] = ['default', 'hover', 'disabled'];

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Chip** (`Type`: Removable, Static; `State`: Default, Hover, Disabled). Figma `Type` is the `variant` prop. ' +
          'A removable chip has a remove button with the accessible name "Remove <label>". Chips show the selected options of a Multi-select.',
      },
    },
  },
  args: { variant: 'removable', state: 'default', label: 'Label', onRemove: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS, description: 'Figma property `Type`.' },
    state: { control: 'select', options: STATES, description: 'Figma property `State`. Hover also works natively.' },
    label: { control: 'text' },
    onRemove: { control: false, description: 'Called when the remove button is pressed.' },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Label' }));
    await expect(args.onRemove).toHaveBeenCalledTimes(1);
  },
};

export const Static: Story = { args: { variant: 'static' } };

export const Disabled: Story = {
  args: { state: 'disabled' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Remove Label' })).toBeDisabled();
  },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <StoryMatrix rows={VARIANTS} cols={STATES}>
      {(variant, state) => <Chip {...args} variant={variant} state={state} />}
    </StoryMatrix>
  ),
};
