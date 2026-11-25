import type { HTMLAttributes } from 'react';
import './Select.css';

export type SelectMenuProps = Omit<HTMLAttributes<HTMLUListElement>, 'role'> & {
  /** More than one option can be selected (Multi-select). */
  multiple?: boolean;
};

/**
 * Figma component "Select menu": the dropdown list of Select and Multi-select fields.
 * Place `SelectOption` elements inside. In the Input it opens 4px below the field, with the same width.
 */
export function SelectMenu({ multiple = false, className, children, ...rest }: SelectMenuProps) {
  return (
    <ul
      {...rest}
      role="listbox"
      aria-multiselectable={multiple || undefined}
      className={['ds-select-menu', className].filter(Boolean).join(' ')}
    >
      {children}
    </ul>
  );
}
