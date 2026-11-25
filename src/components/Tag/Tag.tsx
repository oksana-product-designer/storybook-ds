import type { HTMLAttributes } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import './Tag.css';

/** Figma component "Badge", property `Type` (Error, Success, Brand). */
export type TagVariant = 'error' | 'success' | 'brand';

export type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  variant?: TagVariant;
  label?: string;
  showIcon?: boolean;
};

const ICON: Record<TagVariant, IconName> = {
  error: 'circle-alert',
  success: 'check',
  brand: 'check',
};

export function Tag({
  variant = 'error',
  label = '4 errors',
  showIcon = true,
  className,
  ...rest
}: TagProps) {
  return (
    <span
      {...rest}
      className={['ds-tag', className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      {showIcon && <Icon name={ICON[variant]} />}
      <span>{label}</span>
    </span>
  );
}
