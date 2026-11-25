import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Tag, type TagVariant } from './Tag';
import { StoryMatrix } from '../../docs/StoryMatrix';

const VARIANTS: TagVariant[] = ['error', 'success', 'brand'];

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'There is no Tag in the Figma file. This component is built from the Figma component **Badge** (`Type`: Error, Success, Brand), ' +
          'so Figma `Type` is the `variant` prop. Chip is not included.',
      },
    },
  },
  args: { variant: 'error', label: '4 errors', showIcon: true },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Figma property `Type` of Badge.',
    },
    label: { control: 'text', description: 'Tag text.' },
    showIcon: { control: 'boolean', description: 'Show the leading icon.' },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.label as string)).toBeVisible();
  },
};
export const Error: Story = { args: { variant: 'error', label: '4 errors' } };
export const Success: Story = { args: { variant: 'success', label: 'Verified' } };
export const Brand: Story = { args: { variant: 'brand', label: 'Brand' } };
export const WithoutIcon: Story = { args: { showIcon: false } };

/** Every variant with and without the icon. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <StoryMatrix rows={VARIANTS} cols={['with icon', 'without icon'] as const}>
      {(variant, col) => (
        <Tag {...args} variant={variant} showIcon={col === 'with icon'} label={variant} />
      )}
    </StoryMatrix>
  ),
};
