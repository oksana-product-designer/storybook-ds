import type { HTMLAttributes } from 'react';
import { Icon } from '../../icons/Icon';
import './Chip.css';

/** Figma property `Type` (Removable, Static). */
export type ChipVariant = 'removable' | 'static';
/** Figma property `State`. Real hover works through CSS; this prop forces a look. */
export type ChipState = 'default' | 'hover' | 'disabled';

export type ChipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  variant?: ChipVariant;
  state?: ChipState;
  label?: string;
  /** Called when the remove button of a removable chip is pressed. */
  onRemove?: () => void;
};

export function Chip({
  variant = 'removable',
  state = 'default',
  label = 'Label',
  onRemove,
  className,
  ...rest
}: ChipProps) {
  const isDisabled = state === 'disabled';
  return (
    <span
      {...rest}
      className={['ds-chip', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-state={state}
    >
      <span className="ds-chip__label">{label}</span>
      {variant === 'removable' && (
        <button
          type="button"
          className="ds-chip__remove"
          disabled={isDisabled}
          aria-label={`Remove ${label}`}
          onClick={onRemove}
        >
          <Icon name="x" size="var(--icon-size-sm)" />
        </button>
      )}
    </span>
  );
}
