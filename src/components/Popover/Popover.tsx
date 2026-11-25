import { useEffect, useId, useState, type HTMLAttributes } from 'react';
import { Icon } from '../../icons/Icon';
import './Popover.css';

export type PopoverProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  text?: string;
};

/** Figma component "Popover": the dark box with the text. Use `InfoPopover` for the info icon that opens it. */
export function Popover({
  text = 'We send your order confirmation, receipt, and status updates to this address. We also use it to reach you if we need anything to complete your order.',
  className,
  ...rest
}: PopoverProps) {
  return (
    <div role="tooltip" {...rest} className={['ds-popover', className].filter(Boolean).join(' ')}>
      {text}
    </div>
  );
}

export type InfoPopoverProps = {
  /** The text shown in the popover. */
  text: string;
  /** Accessible name of the info button. */
  label?: string;
  className?: string;
};

/**
 * The info icon with its popover. As in Figma, the popover opens 8px above the icon on hover or
 * focus, is right-aligned to the icon and closes with Escape.
 */
export function InfoPopover({ text, label = 'More information', className }: InfoPopoverProps) {
  const id = useId();
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const open = (hover || focus) && !dismissed;

  // Escape closes the popover until the pointer or focus leaves and comes back.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDismissed(true);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <span
      className={['ds-info-popover', className].filter(Boolean).join(' ')}
      onMouseEnter={() => {
        setDismissed(false);
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        className="ds-info-popover__trigger"
        aria-label={label}
        aria-describedby={open ? id : undefined}
        onFocus={() => {
          setDismissed(false);
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
      >
        <Icon name="info" />
      </button>
      {open && <Popover id={id} text={text} className="ds-info-popover__box" />}
    </span>
  );
}
