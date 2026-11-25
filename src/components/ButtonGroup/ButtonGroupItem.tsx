import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import { useButtonGroup } from './ButtonGroupContext';
import './ButtonGroup.css';

/** Figma property `Content` (Text, Logo). */
export type ButtonGroupItemContent = 'text' | 'logo';
/** Figma property `State`. Real hover/press/focus work through CSS; this prop forces a look. */
export type ButtonGroupItemState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled';

export type ButtonGroupItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'value'
> & {
  /** Identifies the item inside the group. Required for the group to select it. */
  value?: string;
  content?: ButtonGroupItemContent;
  label?: string;
  /** Figma property `Selected`. Inside a group it comes from the group's value; set it to override. */
  selected?: boolean;
  state?: ButtonGroupItemState;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Content `logo`: the logo to show. A placeholder is drawn when it is empty. */
  logo?: ReactNode;
};

export function ButtonGroupItem({
  value,
  content = 'text',
  label = 'Label',
  selected,
  state = 'default',
  showLeadingIcon = false,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  logo,
  className,
  disabled,
  onClick,
  type = 'button',
  ...rest
}: ButtonGroupItemProps) {
  const group = useButtonGroup();
  const isSelected = selected ?? (group && value !== undefined ? group.isSelected(value) : false);
  const isDisabled = disabled || state === 'disabled' || group?.disabled || false;

  // Radio pattern: one tab stop. With no selection every enabled item stays reachable.
  const tabIndex = group && !group.multiple && group.hasSelection && !isSelected ? -1 : undefined;

  const semantics = !group
    ? { 'aria-pressed': isSelected }
    : group.multiple
      ? { 'aria-pressed': isSelected }
      : { role: 'radio' as const, 'aria-checked': isSelected };

  return (
    <button
      {...rest}
      {...semantics}
      type={type}
      value={value}
      tabIndex={tabIndex}
      disabled={isDisabled}
      className={['ds-button-group-item', className].filter(Boolean).join(' ')}
      data-content={content}
      data-selected={isSelected}
      data-state={state}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented && group && value !== undefined) group.select(value);
      }}
    >
      {content === 'logo' ? (
        (logo ?? <span className="ds-button-group-item__logo-placeholder">Logo</span>)
      ) : (
        <>
          {showLeadingIcon && (leadingIcon ?? <Icon name="check" />)}
          <span>{label}</span>
          {showTrailingIcon && (trailingIcon ?? <Icon name="arrow-right" />)}
        </>
      )}
    </button>
  );
}
