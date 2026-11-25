import type { HTMLAttributes } from 'react';
import { Icon } from '../../icons/Icon';
import './ChevronToggle.css';

/** Figma property `State` (Open shows chevron-up, Closed shows chevron-down). */
export type ChevronToggleState = 'open' | 'closed';

export type ChevronToggleProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  state?: ChevronToggleState;
};

/** Decorative indicator for an expandable row. The control that owns it sets `aria-expanded`. */
export function ChevronToggle({ state = 'open', className, ...rest }: ChevronToggleProps) {
  return (
    <span
      {...rest}
      aria-hidden="true"
      className={['ds-chevron-toggle', className].filter(Boolean).join(' ')}
      data-state={state}
    >
      <Icon name={state === 'open' ? 'chevron-up' : 'chevron-down'} />
    </span>
  );
}
