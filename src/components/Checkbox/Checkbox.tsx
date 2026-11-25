import type { ComponentPropsWithRef } from 'react';
import { useId } from 'react';
import { Icon } from '../../icons/Icon';
import { InfoPopover } from '../Popover';
import './Checkbox.css';

/** Figma property `State`. Real hover/focus work through CSS; this prop forces a state. */
export type CheckboxState = 'default' | 'hover' | 'focus' | 'disabled' | 'error';

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'title' | 'children'> & {
  /** Figma property `Checked`. Use `defaultChecked` for an uncontrolled checkbox. */
  checked?: boolean;
  state?: CheckboxState;
  label?: string;
  showLabel?: boolean;
  /** Figma property `Description`: show the description text under the label. */
  description?: boolean;
  descriptionText?: string;
  errorMessage?: string;
  showTitle?: boolean;
  title?: string;
  titleRequired?: boolean;
  titleInfoIcon?: boolean;
  /** Text of the info popover on the title. Without it the info icon is shown without a popover. */
  titleInfoText?: string;
};

export function Checkbox({
  checked,
  state = 'default',
  label = 'Label',
  showLabel = true,
  description = false,
  descriptionText = 'Description text',
  errorMessage = 'Error message',
  showTitle = false,
  title = 'Title',
  titleRequired = false,
  titleInfoIcon = false,
  titleInfoText,
  className,
  id,
  disabled,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const isDisabled = disabled || state === 'disabled';
  const hasError = state === 'error';
  const describedBy =
    [description ? `${controlId}-description` : null, hasError ? `${controlId}-error` : null]
      .filter(Boolean)
      .join(' ') || undefined;

  // Without a visible label the box still needs an accessible name.
  const ariaLabel = showLabel ? undefined : rest['aria-label'] ?? label;

  return (
    <div
      className={['ds-checkbox', className].filter(Boolean).join(' ')}
      data-state={state}
      data-checked={checked === undefined ? undefined : String(checked)}
    >
      {showTitle && (
        <div className="ds-checkbox__title-row">
          <span className="ds-checkbox__title">
            <span>{title}</span>
            {titleRequired && <span className="ds-checkbox__required" aria-hidden="true">*</span>}
          </span>
          {titleInfoIcon &&
            (titleInfoText ? (
              <InfoPopover text={titleInfoText} />
            ) : (
              <Icon name="info" className="ds-checkbox__info" />
            ))}
        </div>
      )}

      <label className="ds-checkbox__row" htmlFor={controlId}>
        <input
          {...rest}
          id={controlId}
          type="checkbox"
          className="ds-checkbox__input"
          checked={checked}
          disabled={isDisabled}
          aria-label={ariaLabel}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
        />
        <span className="ds-checkbox__area">
          <span className="ds-checkbox__box">
            <Icon name="check" className="ds-checkbox__check" />
          </span>
        </span>
        {showLabel && <span className="ds-checkbox__label">{label}</span>}
      </label>

      {description && (
        <p id={`${controlId}-description`} className="ds-checkbox__description">
          {descriptionText}
        </p>
      )}

      {hasError && (
        <p id={`${controlId}-error`} className="ds-checkbox__error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
