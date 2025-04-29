import { createContext } from 'react';
import { SeedContextType } from '../../types';

export const SeedContext = createContext<SeedContextType>({ customizations: { components: {} } });
