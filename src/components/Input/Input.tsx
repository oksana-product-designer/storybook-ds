import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import './Input.css';

/** Figma property `Type` (Text, Select, Date, Multi-select). */
export type InputVariant = 'text' | 'select' | 'date' | 'multi-select';
/** Figma property `State`. Real hover/focus work through CSS; this prop forces a state. */
export type InputState = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled' | 'success';

export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  variant?: InputVariant;
  state?: InputState;
  label?: string;
  required?: boolean;
  infoIcon?: boolean;
  showHelperText?: boolean;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  /** Native input type for the Text variant (email, tel, ...). */
  inputType?: string;
  /** Select: the <option> elements. Multi-select: the selected chips. */
  children?: ReactNode;
};

export function Input({
  variant = 'text',
  state = 'default',
  label = 'Label',
  required = true,
  infoIcon = false,
  showHelperText = false,
  helperText = 'Helper text',
  errorMessage = 'Error message',
  successMessage = 'Success message',
  inputType = 'text',
  children,
  className,
  id,
  disabled,
  placeholder,
  ...rest
}: InputProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const messageId = `${controlId}-message`;
  const isDisabled = disabled || state === 'disabled';
  const message =
    state === 'error' ? errorMessage : state === 'success' ? successMessage : showHelperText ? helperText : null;
  const describedBy = message ? messageId : undefined;
  const invalid = state === 'error' ? true : undefined;

  let control: ReactNode;
  if (variant === 'select') {
    control = (
      <select
        {...(rest as unknown as ComponentPropsWithRef<'select'>)}
        id={controlId}
        className="ds-input__control"
        disabled={isDisabled}
        required={required}
        aria-invalid={invalid}
        aria-describedby={describedBy}
      >
        {children}
      </select>
    );
  } else if (variant === 'multi-select') {
    control = (
      <div
        id={controlId}
        className="ds-input__control ds-input__control--multi"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-disabled={isDisabled || undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        tabIndex={isDisabled ? -1 : 0}
        data-filled={children ? '' : undefined}
      >
        {children ?? <span className="ds-input__placeholder">{placeholder}</span>}
      </div>
    );
  } else {
    control = (
      <input
        {...rest}
        id={controlId}
        type={variant === 'date' ? 'text' : inputType}
        inputMode={variant === 'date' ? 'numeric' : rest.inputMode}
        className="ds-input__control"
        disabled={isDisabled}
        required={required}
        placeholder={placeholder ?? ' '}
        aria-invalid={invalid}
        aria-describedby={describedBy}
      />
    );
  }

  return (
    <div
      className={['ds-input', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-state={state}
    >
      <div className="ds-input__label-row">
        <label className="ds-input__label" htmlFor={controlId}>
          <span>{label}</span>
          {required && <span className="ds-input__required" aria-hidden="true">*</span>}
        </label>
        {infoIcon && <Icon name="info" className="ds-input__info" />}
      </div>

      <div className="ds-input__field">
        {control}
        {variant === 'select' || variant === 'multi-select' ? (
          <Icon name="chevron-down" size="var(--space-24)" className="ds-input__icon" />
        ) : null}
        {variant === 'date' && <Icon name="calendar" className="ds-input__icon" />}
        {state === 'success' && <Icon name="check" className="ds-input__success-icon" />}
      </div>

      {message && (
        <p id={messageId} className="ds-input__message" role={state === 'error' ? 'alert' : undefined}>
          {message}
        </p>
      )}
    </div>
  );
}
