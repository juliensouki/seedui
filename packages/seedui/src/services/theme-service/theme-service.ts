import { borderRadius } from '../../tokens/border-radius';
import { breakpoints } from '../../tokens/breakpoints';
import { spacing } from '../../tokens/spacing';
import { Mode, Theme, ThemeCustomization } from '../../types';
import {
  primary as lightPrimary,
  neutral as lightNeutral,
  info as lightInfo,
  success as lightSuccess,
  warning as lightWarning,
  error as lightError,
} from '../../tokens/colors/light/semantics';
import {
  primary as darkPrimary,
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
import { TypographyService } from '../typography-service/typography-service';
import { boxShadow } from '../../tokens/box-shadow';
import { BoxShadowService } from '../box-shadow-service/box-shadow-service';
import { ColorService } from '../color-service/color-service';

interface ThemeService {
  getDefaultTheme: (mode?: Mode) => Theme;
  getCustomizedTheme: (customTheme: ThemeCustomization, mode?: Mode) => Theme;
}

export const themeServiceFactory = ({
  spacingService,
  typographyService,
  boxShadowService,
  colorService,
}: {
  spacingService: SpacingService;
  typographyService: TypographyService;
  boxShadowService: BoxShadowService;
  colorService: ColorService;
}): ThemeService => {
  const semanticColors = {
    light: {
      primary: lightPrimary,
      neutral: lightNeutral,
      info: lightInfo,
      success: lightSuccess,
      warning: lightWarning,
      error: lightError,
    },
    dark: {
      primary: darkPrimary,
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
    boxShadow: boxShadow[mode],
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
        typography: typographyService.generateCustomTypography(customTheme.typography),
        boxShadow: boxShadowService.generateCustomBoxShadow(customTheme.boxShadow || { light: {}, dark: {} }, mode),
        colors: colorService.generateCustomColors(customTheme.colors || {}),
      };
    },
  };
};
