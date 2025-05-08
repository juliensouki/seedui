import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { Mode, Theme } from '../../types';
import { themeServiceFactory } from '../../services/theme-service/theme-service';
import { ThemeCustomization } from '../../types';
import { spacingServiceFactory } from '../../services/spacing-service/spacing-service';
import { SeedContext } from './context';
import { typographyServiceFactory } from '../../services/typography-service/typography-service';

interface ThemeProviderProps {
  mode?: Mode;
  theme?: ThemeCustomization;
  children: ReactNode;
}

const spacingService = spacingServiceFactory();
const typographyService = typographyServiceFactory();
const themeService = themeServiceFactory({ spacingService, typographyService });

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  mode = 'light',
  theme: customTheme,
  children,
}) => {
  const [currentMode, setMode] = useState<Mode>(mode);
  const [theme, setTheme] = useState<Theme>(themeService.getDefaultTheme(mode));

  useEffect(() => {
    setMode(mode);
    if (customTheme) {
      setTheme(themeService.getCustomizedTheme(customTheme, mode));
    } else {
      setTheme(themeService.getDefaultTheme(mode));
    }
  }, [mode, customTheme]);

  return (
    <SCThemeProvider theme={{ ...theme, mode: currentMode }}>
      <SeedContext.Provider value={{ customizations: { components: customTheme?.components } }}>
        {children}
      </SeedContext.Provider>{' '}
    </SCThemeProvider>
  );
};
