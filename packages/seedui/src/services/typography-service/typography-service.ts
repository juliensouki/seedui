import {
  CustomTypographyConfig,
  CustomTypographyResponsiveConfig,
  TypographyConfig,
  TypographyVariants,
} from '../../types';
import * as defaultTypography from '../../tokens/typography';

export interface TypographyService {
  generateCustomTypography: (customTypography?: CustomTypographyConfig) => Record<TypographyVariants, TypographyConfig>;
}

export const typographyServiceFactory = (): TypographyService => {
  const mergeStyles = (a: TypographyConfig, b: CustomTypographyResponsiveConfig | undefined): TypographyConfig => {
    return {
      ...a,
      ...b,
      responsive: {
        desktop: {
          ...a.responsive.desktop,
          ...b?.responsive?.desktop,
        },
        tablet: {
          ...a.responsive.tablet,
          ...b?.responsive?.tablet,
        },
        mobile: {
          ...a.responsive.mobile,
          ...b?.responsive?.mobile,
        },
      },
    };
  };

  return {
    generateCustomTypography: (customTypography = {}) => ({
      h1: mergeStyles(defaultTypography.h1Styles, customTypography?.h1),
      h2: mergeStyles(defaultTypography.h2Styles, customTypography?.h2),
      h3: mergeStyles(defaultTypography.h3Styles, customTypography?.h3),
      h4: mergeStyles(defaultTypography.h4Styles, customTypography?.h4),
      h5: mergeStyles(defaultTypography.h5Styles, customTypography?.h5),
      h6: mergeStyles(defaultTypography.h6Styles, customTypography?.h6),
      p: mergeStyles(defaultTypography.pStyles, customTypography?.p),
      caption: mergeStyles(defaultTypography.captionStyles, customTypography?.caption),
      small: mergeStyles(defaultTypography.smallStyles, customTypography?.small),
    }),
  };
};
