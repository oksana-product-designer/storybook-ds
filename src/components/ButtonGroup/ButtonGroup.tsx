import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ButtonGroupContext, type ButtonGroupContextValue } from './ButtonGroupContext';
import './ButtonGroup.css';

type CommonProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> & {
  /** The Figma "Options" slot: ButtonGroupItem elements. */
  children?: ReactNode;
  /** Disables every item. */
  disabled?: boolean;
};

type SingleProps = {
  /** One choice, radio behaviour (default). */
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type MultipleProps = {
  /** Several choices, each item toggles on its own. */
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type ButtonGroupProps = CommonProps & (SingleProps | MultipleProps);

const toArray = (v: string | string[] | undefined): string[] =>
  v === undefined ? [] : Array.isArray(v) ? v : [v];

export function ButtonGroup(props: ButtonGroupProps) {
  const {
    multiple = false,
    value,
    defaultValue,
    onChange,
    disabled = false,
    children,
    className,
    onKeyDown,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState<string[]>(() => toArray(defaultValue));
  const controlled = value !== undefined;
  const selected = controlled ? toArray(value) : inner;

  const select = useCallback(
    (item: string) => {
      let next: string[];
      if (multiple) {
        next = selected.includes(item) ? selected.filter((v) => v !== item) : [...selected, item];
      } else {
        if (selected[0] === item) return;
        next = [item];
      }
      if (!controlled) setInner(next);
      if (multiple) (onChange as ((v: string[]) => void) | undefined)?.(next);
      else (onChange as ((v: string) => void) | undefined)?.(next[0]);
    },
    [multiple, selected, controlled, onChange],
  );

  const ctx = useMemo<ButtonGroupContextValue>(
    () => ({
      multiple,
      hasSelection: selected.length > 0,
      disabled,
      isSelected: (v) => selected.includes(v),
      select,
    }),
    [multiple, selected, disabled, select],
  );

  // Radio pattern: arrows move focus and selection, Home and End jump to the ends.
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || multiple) return;
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const items = Array.from(
      ref.current?.querySelectorAll<HTMLElement>('[role="radio"]:not(:disabled)') ?? [],
    );
    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLElement);
    let next = current;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % items.length;
    else next = (current - 1 + items.length) % items.length;
    e.preventDefault();
    items[next].focus();
    items[next].click();
  };

  return (
    <ButtonGroupContext.Provider value={ctx}>
      <div
        {...rest}
        ref={ref}
        role={multiple ? 'group' : 'radiogroup'}
        aria-disabled={disabled || undefined}
        className={['ds-button-group', className].filter(Boolean).join(' ')}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}
