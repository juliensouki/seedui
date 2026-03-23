import { createContext } from 'react';
import { SeedContextType } from '../../types';
import { colorServiceFactory } from '../../services/color-service/color-service';

const defaultColorService = colorServiceFactory();

export const SeedContext = createContext<SeedContextType>({
  customizations: { components: {} },
  colorService: defaultColorService,
});
