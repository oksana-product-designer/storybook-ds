import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextLink, type TextLinkState } from './TextLink';
import { StoryMatrix } from '../../docs/StoryMatrix';

const STATES: TextLinkState[] = ['default', 'hover', 'pressed', 'focus', 'disabled'];

const meta = {
  title: 'Components/TextLink',
  component: TextLink,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Text link**: an underlined link in `text/link`. It is a real `<a>`: pass `href`. ' +
          'Hover, pressed and focus work natively; `state` forces a look. `disabled` removes the `href` and the tab stop and sets `aria-disabled`.',
      },
    },
  },
  args: { label: 'Link', state: 'default', href: '#' },
  argTypes: {
    label: { control: 'text', description: 'Link text.' },
    state: { control: 'select', options: STATES, description: 'Figma property `State`.' },
    href: { control: 'text' },
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Disabled: Story = {
  args: { state: 'disabled' },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Link' });
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await expect(link).not.toHaveAttribute('href');
  },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <StoryMatrix rows={['text link'] as const} cols={STATES}>
      {(_row, state) => <TextLink {...args} state={state} />}
    </StoryMatrix>
  ),
};
