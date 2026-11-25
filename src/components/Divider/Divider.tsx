import type { HTMLAttributes } from 'react';
import './Divider.css';

export type DividerProps = HTMLAttributes<HTMLHRElement>;

/** Figma component "Divider": a 1px horizontal line in border/divider. */
export function Divider({ className, ...rest }: DividerProps) {
  return <hr {...rest} className={['ds-divider', className].filter(Boolean).join(' ')} />;
}
