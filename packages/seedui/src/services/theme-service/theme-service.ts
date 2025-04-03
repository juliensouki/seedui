import { borderRadius } from '../../tokens/border-radius';
import { breakpoints } from '../../tokens/breakpoints';
import { spacing } from '../../tokens/spacing';
import { Mode, Theme } from '../../types';
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

interface ThemeService {
  getDefaultTheme: (mode?: Mode) => Theme;
}

export const themeServiceFactory = (): ThemeService => {
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

  return {
    getDefaultTheme: (mode: Mode = 'light') => {
      return {
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
      };
    },
  };
};
