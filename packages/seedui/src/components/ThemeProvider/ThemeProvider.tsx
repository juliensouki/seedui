import { createContext, FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { Mode, SeedContextType, Theme } from '../../types';
import { themeServiceFactory } from '../../services/theme-service/theme-service';
import { ThemeCustomization } from '../../types';

interface ThemeProviderProps {
  mode?: Mode;
  theme?: ThemeCustomization;
  children: ReactNode;
}

const themeService = themeServiceFactory();

export const SeedContext = createContext<SeedContextType>({ customizations: { components: {} } });

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  mode = 'light',
  theme: customTheme,
  children,
}) => {
  const [currentMode, setMode] = useState<Mode>(mode);
  const [theme, setTheme] = useState<Theme>(themeService.getDefaultTheme(mode));

  useEffect(() => {
    setMode(mode);
    setTheme(themeService.getDefaultTheme(mode));
  }, [mode]);

  return (
    <SCThemeProvider theme={{ ...theme, mode: currentMode }}>
      <SeedContext.Provider value={{ customizations: { components: customTheme?.components } }}>
        {children}
      </SeedContext.Provider>{' '}
    </SCThemeProvider>
  );
};
