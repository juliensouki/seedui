import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { Mode, Theme } from '../../types';
import { themeServiceFactory } from '../../services/theme-service/theme-service';
import { ThemeCustomization } from '../../types';
import { spacingServiceFactory } from '../../services/spacing-service/spacing-service';
import { SeedContext } from './context';
import { typographyServiceFactory } from '../../services/typography-service/typography-service';
import { boxShadowServiceFactory } from '../../services/box-shadow-service/box-shadow-service';
import { colorServiceFactory } from '../../services/color-service/color-service';

interface ThemeProviderProps {
  mode?: Mode;
  theme?: ThemeCustomization;
  children: ReactNode;
}

const spacingService = spacingServiceFactory();
const typographyService = typographyServiceFactory();
const boxShadowService = boxShadowServiceFactory();
const colorService = colorServiceFactory();
const themeService = themeServiceFactory({ spacingService, typographyService, boxShadowService, colorService });

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
