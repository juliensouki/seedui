import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { Mode, Theme } from '../../types';
import { themeServiceFactory } from '../../services/theme-service/theme-service';
import { CustomTheme } from '../../types';

interface ThemeProviderProps {
  mode?: Mode;
  theme?: CustomTheme;
  children: ReactNode;
}

const themeService = themeServiceFactory();

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  mode = 'light',
  theme: customTheme,
  children,
}) => {
  const [currentMode, setMode] = useState<Mode>(mode);
  const [theme, setTheme] = useState<Theme>({
    ...themeService.getDefaultTheme(mode),
    components: customTheme?.components,
  });

  useEffect(() => {
    setMode(mode);
    setTheme({
      ...themeService.getDefaultTheme(mode),
      components: customTheme?.components,
    });
  }, [mode, customTheme]);

  return <SCThemeProvider theme={{ ...theme, mode: currentMode }}>{children}</SCThemeProvider>;
};
