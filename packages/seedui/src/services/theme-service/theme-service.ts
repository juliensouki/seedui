import { borderRadius } from '../../tokens/border-radius';
import { breakpoints } from '../../tokens/breakpoints';
import { spacing } from '../../tokens/spacing';
import { Mode, Theme, ThemeCustomization } from '../../types';
import {
  primary as lightPrimary,
  secondary as lightSecondary,
  neutral as lightNeutral,
  info as lightInfo,
  success as lightSuccess,
  warning as lightWarning,
  error as lightError,
} from '../../tokens/colors/light/semantics';
import {
  primary as darkPrimary,
  secondary as darkSecondary,
  neutral as darkNeutral,
  info as darkInfo,
  success as darkSuccess,
  warning as darkWarning,
  error as darkError,
} from '../../tokens/colors/dark/semantics';
import {
  h1Styles,
  h2Styles,
  h3Styles,
  h4Styles,
  h5Styles,
  h6Styles,
  pStyles,
  captionStyles,
  smallStyles,
} from '../../tokens/typography';
import { SpacingService } from '../spacing-service/spacing-service';

interface ThemeService {
  getDefaultTheme: (mode?: Mode) => Theme;
  getCustomizedTheme: (customTheme: ThemeCustomization, mode?: Mode) => Theme;
}

export const themeServiceFactory = ({ spacingService }: { spacingService: SpacingService }): ThemeService => {
  const semanticColors = {
    light: {
      primary: lightPrimary,
      secondary: lightSecondary,
      neutral: lightNeutral,
      info: lightInfo,
      success: lightSuccess,
      warning: lightWarning,
      error: lightError,
    },
    dark: {
      primary: darkPrimary,
      secondary: darkSecondary,
      neutral: darkNeutral,
      info: darkInfo,
      success: darkSuccess,
      warning: darkWarning,
      error: darkError,
    },
  };

  const getDefaultTheme = (mode: Mode = 'light'): Theme => ({
    breakpoints,
    spacing,
    borderRadius,
    colors: semanticColors[mode],
    typography: {
      h1: h1Styles,
      h2: h2Styles,
      h3: h3Styles,
      h4: h4Styles,
      h5: h5Styles,
      h6: h6Styles,
      p: pStyles,
      caption: captionStyles,
      small: smallStyles,
    },
    mode,
  });

  return {
    getDefaultTheme,
    getCustomizedTheme: (customTheme: ThemeCustomization = {}, mode: Mode = 'light'): Theme => {
      const defaultTheme = getDefaultTheme(mode);

      return {
        ...defaultTheme,
        breakpoints: {
          ...defaultTheme.breakpoints,
          ...customTheme.breakpoints,
        },
        borderRadius: {
          ...defaultTheme.borderRadius,
          ...customTheme.borderRadius,
        },
        spacing: spacingService.generateCustomSpacing(customTheme.spacing || 1),
      };
    },
  };
};
