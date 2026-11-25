import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component: 'Figma component **Divider**: a 1px horizontal line in `border/divider`. It fills the width of its container.',
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 'calc(var(--space-32) * 10)' }}>
        <Story />
      </div>
    ),
  ],
};
