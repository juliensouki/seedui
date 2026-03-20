import { createContext, useContext } from 'react';

export const ModeToggleContext = createContext<(() => void) | null>(null);

export function useModeToggle() {
  const toggle = useContext(ModeToggleContext);
  if (!toggle) throw new Error('useModeToggle must be used within ModeToggleContext');
  return toggle;
}
