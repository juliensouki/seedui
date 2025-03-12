import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { Mode, Theme } from '../../types';
import { themeServiceFactory } from '../../services/theme-service/theme-service';

interface ThemeProviderProps {
  mode?: Mode;
  children: ReactNode;
}

const themeService = themeServiceFactory();

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ mode = 'light', children }) => {
  const [currentMode, setMode] = useState<Mode>(mode);
  const [theme, setTheme] = useState<Theme>(themeService.getDefaultTheme(mode));

  useEffect(() => {
    setMode(mode);
    setTheme(themeService.getDefaultTheme(mode));
  }, [mode]);

  return <SCThemeProvider theme={{ ...theme, mode: currentMode }}>{children}</SCThemeProvider>;
};
