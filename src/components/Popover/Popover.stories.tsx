import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Popover, InfoPopover } from './Popover';

const TEXT =
  'We send your order confirmation, receipt, and status updates to this address. We also use it to reach you if we need anything to complete your order.';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Popover**: the dark box with the text, at most 36 characters wide. ' +
          'Use **InfoPopover** for the info icon that opens it: the popover opens 8px above the icon on hover or focus, is right-aligned to the icon and closes with Escape.',
      },
    },
  },
  args: { text: TEXT },
  argTypes: { text: { control: 'text', description: 'The text in the popover (Figma property `Text`).' } },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The info icon with its popover. Hover or focus the icon, Escape closes it. */
export const InfoIcon: Story = {
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBlockStart: 'calc(var(--space-32) * 4)' }}>
        <Story />
      </div>
    ),
  ],
  render: () => <InfoPopover text={TEXT} label="About your email" />,
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'About your email' });
    await userEvent.hover(trigger);
    await expect(await canvas.findByRole('tooltip')).toHaveTextContent('We send your order confirmation');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(canvas.queryByRole('tooltip')).toBeNull());
  },
};
