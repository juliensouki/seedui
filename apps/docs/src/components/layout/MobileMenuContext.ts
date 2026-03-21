import { createContext } from 'react';

export const MobileMenuContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}>({ isOpen: false, toggle: () => {}, close: () => {} });
