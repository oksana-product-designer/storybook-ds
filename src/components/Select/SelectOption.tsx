import type { LiHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import './Select.css';

/** Figma property `State`. Hover also highlights the option; `active` is the keyboard highlight. */
export type SelectOptionState = 'default' | 'active' | 'selected';

export type SelectOptionProps = Omit<LiHTMLAttributes<HTMLLIElement>, 'children'> & {
  label?: string;
  state?: SelectOptionState;
  /** First badge, for example `<Tag variant="brand" showIcon={false} label="Fastest" />`. */
  badge?: ReactNode;
  /** Second badge, for example `<Tag variant="success" showIcon={false} label="Recommended" />`. */
  secondBadge?: ReactNode;
};

export function SelectOption({
  label = 'Option',
  state = 'default',
  badge,
  secondBadge,
  className,
  ...rest
}: SelectOptionProps) {
  return (
    <li
      role="option"
      aria-selected={state === 'selected'}
      {...rest}
      className={['ds-select-option', className].filter(Boolean).join(' ')}
      data-state={state}
    >
      <span className="ds-select-option__mark">{state === 'selected' && <Icon name="check" />}</span>
      <span className="ds-select-option__label">{label}</span>
      {badge}
      {secondBadge}
    </li>
  );
}
