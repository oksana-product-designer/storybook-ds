import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectMenu } from './SelectMenu';
import { SelectOption, type SelectOptionState } from './SelectOption';
import { Tag } from '../Tag';
import { StoryMatrix } from '../../docs/StoryMatrix';

const STATES: SelectOptionState[] = ['default', 'active', 'selected'];

const fastest = <Tag variant="brand" showIcon={false} label="Fastest" />;
const recommended = <Tag variant="success" showIcon={false} label="Recommended" />;
const cheapest = <Tag variant="brand" showIcon={false} label="Cheapest" />;

const meta = {
  title: 'Components/SelectMenu',
  component: SelectMenu,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma components **Select menu** and **Select option**: the dropdown list of the Select and Multi-select fields (it opens 4px below the field, with the same width). ' +
          'It is a `listbox` and the options are `option`s. Badges are `Tag`s without an icon (`brand` for Fastest and Cheapest, `success` for Recommended). ' +
          'The Input component opens this menu itself; use these components directly only for custom lists.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'calc(var(--space-32) * 9.625)', paddingBlockEnd: 'var(--space-32)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The menu from the Figma "Select menu" component. */
export const Playground: Story = {
  render: (args) => (
    <SelectMenu {...args} aria-label="Processing speed">
      <SelectOption label="2 Days" badge={fastest} />
      <SelectOption label="1 Weeks" />
      <SelectOption label="2 Weeks" state="selected" secondBadge={recommended} />
      <SelectOption label="4 Weeks" badge={cheapest} />
    </SelectMenu>
  ),
};

/** Select option: every State, with and without badges. */
export const OptionStates: Story = {
  parameters: { controls: { disable: true } },
  decorators: [],
  render: () => (
    <StoryMatrix rows={['plain', 'with badge'] as const} cols={STATES} colWidth="minmax(240px, 1fr)">
      {(row, state) => (
        <ul role="listbox" aria-label={`${row} ${state}`} style={{ margin: 0, padding: 0, listStyle: 'none', width: '100%' }}>
          <SelectOption label="2 Weeks" state={state} badge={row === 'with badge' ? fastest : undefined} />
        </ul>
      )}
    </StoryMatrix>
  ),
};
