import { createContext, useContext } from 'react';

export type ButtonGroupContextValue = {
  /** true: independent toggle buttons. false: one choice, radio behaviour. */
  multiple: boolean;
  /** At least one item is selected. */
  hasSelection: boolean;
  disabled: boolean;
  isSelected: (value: string) => boolean;
  select: (value: string) => void;
};

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

/** null when the item is used outside a ButtonGroup. */
export const useButtonGroup = () => useContext(ButtonGroupContext);
