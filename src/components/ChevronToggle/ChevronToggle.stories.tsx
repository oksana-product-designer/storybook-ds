import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ChevronToggle } from './ChevronToggle';
import { StoryMatrix } from '../../docs/StoryMatrix';

const meta = {
  title: 'Components/ChevronToggle',
  component: ChevronToggle,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Chevron toggle** (`State`: Open, Closed). A decorative indicator for an expandable row: ' +
          'the button that owns it sets `aria-expanded`, the chevron itself is hidden from screen readers.',
      },
    },
  },
  args: { state: 'open' },
  argTypes: { state: { control: 'inline-radio', options: ['open', 'closed'], description: 'Figma property `State`.' } },
} satisfies Meta<typeof ChevronToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryMatrix rows={['chevron'] as const} cols={['open', 'closed'] as const}>
      {(_row, state) => <ChevronToggle state={state} />}
    </StoryMatrix>
  ),
};

/** With a button that expands and collapses a section. */
export const WithButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-8)', font: 'inherit' }}
      >
        Features
        <ChevronToggle state={open ? 'open' : 'closed'} />
      </button>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Features' });
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
  },
};
