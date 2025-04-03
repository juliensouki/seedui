import 'styled-components';

import {
  BorderRadius,
  Breakpoints,
  Mode,
  SemanticColors,
  Spacing,
  TypographyConfig,
  TypographyVariants,
} from './types';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: Breakpoints;
    borderRadius: BorderRadius;
    spacing: Spacing;
    colors: SemanticColors;
    typography: Record<TypographyVariants, TypographyConfig>;
    mode: Mode;
  }
}
