import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../../icons/Icon';
import { Calendar } from '../Calendar';
import { Chip } from '../Chip';
import { InfoPopover } from '../Popover';
import { SelectMenu, SelectOption } from '../Select';
import { formatDisplay, fromIso, parseDisplay, toIso } from './date';
import { useDismiss } from './useDismiss';
import './Input.css';

/** Figma property `Type` (Text, Select, Date, Multi-select). */
export type InputVariant = 'text' | 'select' | 'date' | 'multi-select';
/** Figma property `State`. Real hover/focus work through CSS; this prop forces a look. */
export type InputState = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled' | 'success';

/** One choice of a Select or Multi-select. */
export type InputOption = {
  value: string;
  label: string;
  /** For example `<Tag variant="brand" showIcon={false} label="Fastest" />`. */
  badge?: ReactNode;
  /** For example `<Tag variant="success" showIcon={false} label="Recommended" />`. */
  secondBadge?: ReactNode;
  disabled?: boolean;
};

export type InputProps = Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'children' | 'value' | 'defaultValue'
> & {
  variant?: InputVariant;
  state?: InputState;
  label?: string;
  required?: boolean;
  infoIcon?: boolean;
  /** Text of the info popover. Without it the info icon is shown without a popover. */
  infoText?: string;
  showHelperText?: boolean;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  /** Native input type for the Text variant (email, tel, ...). */
  inputType?: string;
  /** The choices of the Select and Multi-select variants. */
  options?: InputOption[];
  /**
   * Text and Select: a string. Multi-select: an array of option values.
   * Date: "YYYY-MM-DD", shown in the field as "DD.MM.YYYY".
   */
  value?: string | string[];
  defaultValue?: string | string[];
  /** Called with the new value by the Select, Date and Multi-select variants. */
  onValueChange?: (value: string | string[]) => void;
};

const toArray = (v: string | string[] | undefined): string[] =>
  v === undefined || v === '' ? [] : Array.isArray(v) ? v : [v];

type FieldProps = {
  id: string;
  disabled: boolean;
  required: boolean;
  invalid?: true;
  describedBy?: string;
  placeholder?: string;
  name?: string;
  trailing: ReactNode;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
};

/* ---------------------------------------------------------------- Select and Multi-select */

function ListField({
  multiple,
  options,
  id,
  disabled,
  required,
  invalid,
  describedBy,
  placeholder,
  name,
  trailing,
  value,
  defaultValue,
  onValueChange,
}: FieldProps & { multiple: boolean; options: InputOption[] }) {
  const [inner, setInner] = useState<string[]>(() => toArray(defaultValue));
  const selected = value !== undefined ? toArray(value) : inner;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const anchor = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(anchor, open, close);

  const optionId = (i: number) => `${listId}-${i}`;
  const step = (from: number, delta: 1 | -1) => {
    for (let i = from + delta; i >= 0 && i < options.length; i += delta) {
      if (!options[i].disabled) return i;
    }
    return from;
  };
  const firstEnabled = () => options.findIndex((o) => !o.disabled);

  const commit = (next: string[]) => {
    if (value === undefined) setInner(next);
    onValueChange?.(multiple ? next : (next[0] ?? ''));
  };

  const choose = (i: number) => {
    const option = options[i];
    if (!option || option.disabled) return;
    if (multiple) {
      commit(selected.includes(option.value) ? selected.filter((v) => v !== option.value) : [...selected, option.value]);
    } else {
      commit([option.value]);
      setOpen(false);
    }
  };

  const openMenu = () => {
    const firstSelected = options.findIndex((o) => selected.includes(o.value));
    setActive(firstSelected >= 0 ? firstSelected : firstEnabled());
    setOpen(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (!open) openMenu();
        else setActive((a) => (a < 0 ? firstEnabled() : step(a, e.key === 'ArrowDown' ? 1 : -1)));
        break;
      case 'Home':
      case 'End':
        if (open) {
          e.preventDefault();
          setActive(e.key === 'Home' ? firstEnabled() : step(options.length, -1));
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) openMenu();
        else if (active >= 0) choose(active);
        else setOpen(false);
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  const toggle = () => {
    if (disabled) return;
    if (open) setOpen(false);
    else openMenu();
  };

  const selectedOptions = options.filter((o) => selected.includes(o.value));
  const text = multiple ? '' : (selectedOptions[0]?.label ?? '');
  const showPlaceholder = multiple ? selected.length === 0 : text === '';

  return (
    <div className="ds-input__anchor" ref={anchor}>
      <div
        className="ds-input__field"
        data-open={open || undefined}
        onClick={(e) => {
          // a click on the padding or on empty space opens the menu, a click on a chip does not
          if ((e.target as HTMLElement).closest('button')) return;
          toggle();
          trigger.current?.focus();
        }}
      >
        {multiple &&
          selectedOptions.map((o) => (
            <Chip key={o.value} label={o.label} state={disabled ? 'disabled' : 'default'} onRemove={() => commit(selected.filter((v) => v !== o.value))} />
          ))}
        <button
          ref={trigger}
          type="button"
          id={id}
          role="combobox"
          className="ds-input__control ds-input__trigger"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
          aria-required={required || undefined}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          data-filled={selected.length > 0 ? '' : undefined}
          onClick={toggle}
          onKeyDown={onKeyDown}
          onKeyUp={(e) => {
            if (e.key === ' ') e.preventDefault();
          }}
        >
          <span className={showPlaceholder ? 'ds-input__placeholder' : undefined}>
            {showPlaceholder ? placeholder : text}
          </span>
          <Icon name="chevron-down" size="var(--space-24)" className="ds-input__icon" />
        </button>
        {trailing}
      </div>

      {open && (
        <SelectMenu id={listId} multiple={multiple} className="ds-input__popup" onMouseDown={(e) => e.preventDefault()}>
          {options.map((o, i) => (
            <SelectOption
              key={o.value}
              id={optionId(i)}
              label={o.label}
              badge={o.badge}
              secondBadge={o.secondBadge}
              state={selected.includes(o.value) ? 'selected' : 'default'}
              aria-disabled={o.disabled || undefined}
              data-active={i === active}
              onClick={() => choose(i)}
              onMouseMove={() => setActive(i)}
            />
          ))}
        </SelectMenu>
      )}

      {name && !multiple && <input type="hidden" name={name} value={selected[0] ?? ''} />}
      {name && multiple && selected.map((v) => <input key={v} type="hidden" name={name} value={v} />)}
    </div>
  );
}

/* ---------------------------------------------------------------------------------- Date */

function DateField({
  id,
  disabled,
  required,
  invalid,
  describedBy,
  placeholder,
  name,
  trailing,
  value,
  defaultValue,
  onValueChange,
}: FieldProps) {
  const [inner, setInner] = useState((defaultValue as string | undefined) ?? '');
  const iso = value !== undefined ? (value as string) : inner;
  const [text, setText] = useState(() => formatDisplay(iso));
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(anchor, open, close);

  // keep the text in step with the value, for example after the calendar picks a day
  useEffect(() => setText(formatDisplay(iso)), [iso]);

  const commit = (next: string) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };

  // typed text becomes the value only when it is a real DD.MM.YYYY date
  const apply = () => {
    if (text.trim() === '') return commit('');
    const parsed = parseDisplay(text);
    if (parsed) commit(parsed);
    else setText(formatDisplay(iso));
  };

  return (
    <div className="ds-input__anchor" ref={anchor}>
      <div className="ds-input__field">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className="ds-input__control"
          disabled={disabled}
          required={required}
          placeholder={placeholder ?? 'DD.MM.YYYY'}
          value={text}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(e) => setText(e.target.value)}
          onBlur={apply}
          onKeyDown={(e) => {
            if (e.key === 'Enter') apply();
            if (e.key === 'Escape') setOpen(false);
            if (e.key === 'ArrowDown') setOpen(true);
          }}
        />
        <button
          type="button"
          className="ds-input__icon-button"
          disabled={disabled}
          aria-label="Open calendar"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name="calendar" />
        </button>
        {trailing}
      </div>

      {open && (
        <div className="ds-input__popup ds-input__popup--calendar">
          <Calendar
            selected={fromIso(iso)}
            onSelect={(d) => {
              if (!d) return;
              commit(toIso(d));
              setOpen(false);
            }}
          />
        </div>
      )}

      {name && <input type="hidden" name={name} value={iso} />}
    </div>
  );
}

/* --------------------------------------------------------------------------------- Input */

export function Input({
  variant = 'text',
  state = 'default',
  label = 'Label',
  required = true,
  infoIcon = false,
  infoText,
  showHelperText = false,
  helperText = 'Helper text',
  errorMessage = 'Error message',
  successMessage = 'Success message',
  inputType = 'text',
  options = [],
  value,
  defaultValue,
  onValueChange,
  className,
  id,
  disabled,
  placeholder,
  name,
  ...rest
}: InputProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const messageId = `${controlId}-message`;
  const isDisabled = disabled || state === 'disabled';
  const message =
    state === 'error' ? errorMessage : state === 'success' ? successMessage : showHelperText ? helperText : null;
  const describedBy = message ? messageId : undefined;
  const invalid = state === 'error' ? (true as const) : undefined;
  const trailing = state === 'success' ? <Icon name="check" className="ds-input__success-icon" /> : null;

  const common: FieldProps = {
    id: controlId,
    disabled: isDisabled,
    required,
    invalid,
    describedBy,
    placeholder,
    name,
    trailing,
    value,
    defaultValue,
    onValueChange,
  };

  let field: ReactNode;
  if (variant === 'select' || variant === 'multi-select') {
    field = <ListField {...common} multiple={variant === 'multi-select'} options={options} />;
  } else if (variant === 'date') {
    field = <DateField {...common} />;
  } else {
    field = (
      <div className="ds-input__field">
        <input
          {...rest}
          id={controlId}
          name={name}
          type={inputType}
          className="ds-input__control"
          disabled={isDisabled}
          required={required}
          placeholder={placeholder ?? ' '}
          value={value as string | undefined}
          defaultValue={defaultValue as string | undefined}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
        {trailing}
      </div>
    );
  }

  return (
    <div className={['ds-input', className].filter(Boolean).join(' ')} data-variant={variant} data-state={state}>
      <div className="ds-input__label-row">
        <label className="ds-input__label" htmlFor={controlId}>
          <span>{label}</span>
          {required && (
            <span className="ds-input__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {infoIcon && (infoText ? <InfoPopover text={infoText} /> : <Icon name="info" className="ds-input__info" />)}
      </div>

      {field}

      {message && (
        <p id={messageId} className="ds-input__message" role={state === 'error' ? 'alert' : undefined}>
          {message}
        </p>
      )}
    </div>
  );
}
