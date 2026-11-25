import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Button, type ButtonState, type ButtonVariant } from './Button';
import { Icon } from '../../icons/Icon';
import { StoryMatrix } from '../../docs/StoryMatrix';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'link', 'link-accent', 'link-danger'];
const STATES: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'disabled'];

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma component **Button**. Figma `Type` is the `variant` prop. ' +
          'Hover, pressed, focus and disabled work natively; the `state` prop only forces a look, which is how the state grids below are drawn. ' +
          'Size `small` exists for `primary` and `secondary` only.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'default',
    state: 'default',
    label: 'Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Figma property `Type`.',
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'small'],
      description: 'Figma property `Size`.',
    },
    state: {
      control: 'select',
      options: STATES,
      description: 'Figma property `State`. Forces a visual state; `disabled` also disables the button.',
    },
    label: { control: 'text', description: 'Button text.' },
    showLeadingIcon: { control: 'boolean', description: 'Show the icon before the label.' },
    showTrailingIcon: { control: 'boolean', description: 'Show the icon after the label.' },
    leadingIcon: { control: false, description: 'Replaces the default leading icon (arrow-left).' },
    trailingIcon: { control: false, description: 'Replaces the default trailing icon (arrow-right).' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Change every property from the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const button = canvas.getByRole('button', { name: args.label });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Primary: Story = { args: { variant: 'primary' } };

/** Proves tokens.css reached the component: primary uses --accent-primary (#F48120). */
export const CssCheck: Story = {
  args: { variant: 'primary', label: 'Submit' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(244, 129, 32)');
  },
};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Link: Story = { args: { variant: 'link' } };
export const LinkAccent: Story = { args: { variant: 'link-accent' } };
export const LinkDanger: Story = { args: { variant: 'link-danger' } };

export const Small: Story = {
  args: { size: 'small' },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
    </div>
  ),
};

export const WithIcons: Story = {
  args: { showLeadingIcon: true, showTrailingIcon: true },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      <Button {...args} variant="primary" showTrailingIcon={false} />
      <Button {...args} variant="secondary" showLeadingIcon={false} />
      <Button {...args} variant="link" />
      <Button
        {...args}
        variant="primary"
        label="Add"
        showTrailingIcon={false}
        leadingIcon={<Icon name="plus" />}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas, args, userEvent }) => {
    const button = canvas.getByRole('button', { name: args.label });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** Every Type x State at the default size, as in the Figma component frame. */
export const AllStatesDefaultSize: Story = {
  name: 'All states (default size)',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <StoryMatrix rows={VARIANTS} cols={STATES}>
      {(variant, state) => <Button {...args} variant={variant} state={state} />}
    </StoryMatrix>
  ),
};

/** Small exists for Primary and Secondary. */
export const AllStatesSmall: Story = {
  name: 'All states (small)',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <StoryMatrix rows={['primary', 'secondary'] as const} cols={STATES}>
      {(variant, state) => <Button {...args} size="small" variant={variant} state={state} />}
    </StoryMatrix>
  ),
};
