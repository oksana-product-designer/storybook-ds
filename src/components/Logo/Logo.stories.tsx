import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Logo, type LogoName } from './Logo';
import { StoryMatrix } from '../../docs/StoryMatrix';

const NAMES: LogoName[] = ['paypal', 'paypal-credit', 'gpay', 'tvp', 'affiliate'];

const meta = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'The Figma **Logos** section: PayPal, PayPal Credit, G Pay and TVP, exported from Figma into `src/assets/logos`. ' +
          '**Affiliate** is a grey placeholder block in Figma (the partner logo is not designed yet), so it is drawn as the same block. ' +
          'Use a logo as the `logo` of a Button group item with `content="logo"`.',
      },
    },
  },
  args: { name: 'paypal' },
  argTypes: {
    name: { control: 'select', options: NAMES, description: 'Which logo.' },
    alt: { control: 'text', description: 'Accessible name. Defaults to the brand name.' },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'PayPal' })).toBeVisible();
  },
};

export const AllLogos: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryMatrix rows={NAMES} cols={['logo'] as const}>
      {(name) => <Logo name={name} />}
    </StoryMatrix>
  ),
};
