import { useCallback, useEffect, useId, useRef, useState, type ComponentPropsWithRef } from 'react';
import { Icon } from '../../icons/Icon';
import { Calendar } from '../Calendar';
import { formatDisplay, fromIso, parseDisplay, toIso } from '../Input/date';
import { useDismiss } from '../Input/useDismiss';
import '../Input/Input.css';
import './InputV2.css';

export type InputV2State = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled' | 'success';
/** Opt-in version of the selected date input; values remain ISO dates for forms. */
export type InputV2Props = Omit<ComponentPropsWithRef<'input'>, 'type' | 'value' | 'defaultValue'> & {
  label?: string;
  state?: InputV2State;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
};

const display = (iso: string) => formatDisplay(iso).replaceAll('.', '/');
const parse = (text: string) => /^\d{2}\/\d{2}\/\d{4}$/.test(text.trim())
  ? parseDisplay(text.trim().replaceAll('/', '.')) : undefined;

export function InputV2({
  label = 'Date you need the documents back', state = 'default', required = true,
  value, defaultValue = '', onValueChange, helperText,
  errorMessage = 'Enter a valid date.', successMessage = 'Date confirmed.',
  id, name, className, disabled, placeholder = 'DD/MM/YYYY',
  onChange, onBlur, onKeyDown, 'aria-describedby': externalDescription,
  'aria-invalid': externalInvalid, ...rest
}: InputV2Props) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const messageId = `${controlId}-message`;
  const calendarId = `${controlId}-calendar`;
  const anchor = useRef<HTMLDivElement>(null);
  const calendarButton = useRef<HTMLButtonElement>(null);
  const [inner, setInner] = useState(defaultValue);
  const iso = value ?? inner;
  const [text, setText] = useState(() => display(iso));
  const [open, setOpen] = useState(false);
  const isDisabled = disabled || state === 'disabled';
  const close = useCallback(() => setOpen(false), []);
  useDismiss(anchor, open, close);
  useEffect(() => setText(display(iso)), [iso]);
  useEffect(() => { if (isDisabled) setOpen(false); }, [isDisabled]);
  const message = state === 'error' ? errorMessage : state === 'success' ? successMessage : helperText;
  const describedBy = [externalDescription, message ? messageId : undefined].filter(Boolean).join(' ') || undefined;
  const commit = (next: string) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
    setText(display(value ?? next));
  };
  const apply = () => {
    if (!text.trim()) return commit('');
    const next = parse(text);
    if (next) commit(next);
    else setText(display(iso));
  };

  return (
    <div ref={anchor} className={['ds-input', 'ds-input-v2', className].filter(Boolean).join(' ')}
      data-variant="date" data-state={state}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) { close(); calendarButton.current?.focus(); }
      }}>
      <div className="ds-input__label-row">
        <label className="ds-input__label" htmlFor={controlId}>
          <span>{label}</span>
          {required && <span className="ds-input__required" aria-hidden="true">*</span>}
        </label>
      </div>
      <div className="ds-input__anchor">
        <div className="ds-input__field">
          <input {...rest} id={controlId} type="text" inputMode="numeric" autoComplete="off"
            className="ds-input__control" disabled={isDisabled} required={required}
            value={text} placeholder={placeholder}
            aria-invalid={state === 'error' ? true : externalInvalid} aria-describedby={describedBy}
            onChange={(event) => { setText(event.target.value); onChange?.(event); }}
            onBlur={(event) => { apply(); onBlur?.(event); }}
            onKeyDown={(event) => {
              onKeyDown?.(event);
              if (event.defaultPrevented) return;
              if (event.key === 'Enter') { event.preventDefault(); apply(); }
              if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); }
            }} />
          <button ref={calendarButton} type="button" className="ds-input__icon-button"
            disabled={isDisabled} aria-label="Open calendar" aria-expanded={open}
            aria-controls={open ? calendarId : undefined} onClick={() => setOpen((previous) => !previous)}>
            <Icon name="calendar" />
          </button>
        </div>
        {open && !isDisabled && <div id={calendarId} className="ds-input__popup ds-input__popup--calendar">
          <Calendar selected={fromIso(iso)} onSelect={(day) => {
            if (!day) return;
            commit(toIso(day)); close(); calendarButton.current?.focus();
          }} />
        </div>}
      </div>
      {message && <p id={messageId} className="ds-input__message" role={state === 'error' ? 'alert' : undefined}>{message}</p>}
      {name && <input type="hidden" name={name} value={iso} disabled={isDisabled} />}
    </div>
  );
}
