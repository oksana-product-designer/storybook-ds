import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { InputV2, type InputV2State } from './InputV2';
import { StoryMatrix } from '../../docs/StoryMatrix';

const STATES: InputV2State[] = ['default', 'hover', 'focus', 'filled', 'error', 'disabled', 'success'];
const meta = {
  title: 'Components/Input V2', component: InputV2, tags: ['ai-generated'],
  parameters: {
    docs: { description: { component:
      'Opt-in **date input V2** from [the updated Figma design](https://www.figma.com/design/YmluYFMIdELMbsDJqbPZBr?node-id=7-63). ' +
      'The existing Input remains unchanged. V2 uses Source Sans 3, a 42px field, and DD/MM/YYYY for both typed and selected dates. ' +
      'Values and form submissions use YYYY-MM-DD. Invalid typed dates revert to the last committed value on blur or Enter. ' +
      'This selected update contains only the date variant; other variants remain in Components/Input. ' +
      'The font loads from the pinned Fontsource package on jsDelivr, with the existing design-system font as fallback.' } },
  },
  args: { label: 'Date you need the documents back', required: true, state: 'default', onValueChange: fn() },
  argTypes: {
    state: { control: 'select', options: STATES },
    label: { control: 'text' }, required: { control: 'boolean' },
    value: { description: 'Controlled ISO date (YYYY-MM-DD).' },
    defaultValue: { description: 'Initial ISO date (YYYY-MM-DD).' },
    onValueChange: { description: 'Called with an ISO date, or an empty string when cleared.' },
  },
  decorators: [(Story, context) => <div style={{ width: context.name === 'All States' ? '100%' : 'var(--input-v2-preview-width)', maxWidth: '100%', padding: 'var(--space-16)' }}><Story /></div>],
} satisfies Meta<typeof InputV2>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const TypedDate: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const field = canvas.getByRole('textbox');
    await userEvent.type(field, '25/12/2026{Enter}');
    await expect(field).toHaveValue('25/12/2026');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('2026-12-25');
    await userEvent.click(canvas.getByRole('button', { name: 'Open calendar' }));
    await expect(await canvas.findByText('December 2026')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Saturday, December 26th, 2026' }));
    await expect(field).toHaveValue('26/12/2026');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('2026-12-26');
  },
};
export const InvalidDate: Story = {
  args: { defaultValue: '2026-12-25' },
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByRole('textbox');
    await userEvent.clear(field);
    await userEvent.type(field, '31/02/2026{Enter}');
    await expect(field).toHaveValue('25/12/2026');
  },
};
export const Error: Story = {
  args: { state: 'error' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toBeVisible();
  },
};
export const Disabled: Story = {
  args: { state: 'disabled' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox')).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Open calendar' })).toBeDisabled();
  },
};
export const AllStates: Story = {
  decorators: [],
  render: (args) => <StoryMatrix rows={['date']} cols={STATES} colWidth="minmax(280px, 1fr)">
    {(_, state) => <InputV2 {...args} state={state}
      defaultValue={['filled', 'error', 'success'].includes(state) ? '2026-12-25' : undefined} />}
  </StoryMatrix>,
};
