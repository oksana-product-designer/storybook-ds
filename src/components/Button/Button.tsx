import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import './Button.css';

/** Figma property `Type` (Primary, Secondary, Link, Link accent, Link danger). */
export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'link-accent' | 'link-danger';
/** Figma property `Size` (Default, Small). Small exists for primary and secondary only. */
export type ButtonSize = 'default' | 'small';
/** Figma property `State`. Real hover/press/focus work through CSS; this prop forces a state. */
export type ButtonState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  label?: string;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'default',
  state = 'default',
  label = 'Button',
  showLeadingIcon = false,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  className,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || state === 'disabled';
  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      className={['ds-button', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-size={size}
      data-state={state}
    >
      {showLeadingIcon && (leadingIcon ?? <Icon name="arrow-left" />)}
      <span className="ds-button__label">{label}</span>
      {showTrailingIcon && (trailingIcon ?? <Icon name="arrow-right" />)}
    </button>
  );
}
