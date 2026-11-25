import type { AnchorHTMLAttributes } from 'react';
import './TextLink.css';

/** Figma property `State`. Real hover/press/focus work through CSS; this prop forces a look. */
export type TextLinkState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled';

export type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
  label?: string;
  state?: TextLinkState;
};

export function TextLink({
  label = 'Link',
  state = 'default',
  href,
  className,
  tabIndex,
  ...rest
}: TextLinkProps) {
  const isDisabled = state === 'disabled';
  return (
    <a
      {...rest}
      // A disabled link has no destination and is skipped by the keyboard.
      href={isDisabled ? undefined : href}
      role={isDisabled ? 'link' : undefined}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : tabIndex}
      className={['ds-text-link', className].filter(Boolean).join(' ')}
      data-state={state}
    >
      {label}
    </a>
  );
}
