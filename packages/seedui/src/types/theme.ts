export interface PrimitiveColorShades {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface SemanticColorShades extends PrimitiveColorShades {
  default: string;
}

export type Colors = keyof SemanticColors;

export interface SemanticColors {
  primary: SemanticColorShades;
  neutral: SemanticColorShades & { white: string; black: string };
  success: SemanticColorShades;
  info: SemanticColorShades;
  warning: SemanticColorShades;
  error: SemanticColorShades;
}

export interface BreakpointKeys {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Breakpoints extends BreakpointKeys {
  mobile: keyof BreakpointKeys;
  tablet: keyof BreakpointKeys;
  desktop: keyof BreakpointKeys;
  up: (key: keyof BreakpointKeys) => string;
  down: (key: keyof BreakpointKeys) => string;
  between: (start: keyof BreakpointKeys, end: keyof BreakpointKeys) => string;
}

export type Spacing = (factor: number) => number;

export type BorderRadius = (factor: number | 'full') => number;

export interface BoxShadow {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

export interface TypographyResponsiveOverride {
  fontSize?: number | string;
  lineHeight?: number | string;
}

export interface TypographyConfig {
  fontFamily: string;
  fontWeight: string | number;
  letterSpacing: string;
  fontSize: number | string;
  lineHeight: number | string;
  responsive?: Partial<Record<'tablet' | 'mobile', TypographyResponsiveOverride>>;
}

export type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'small';

export type Mode = 'light' | 'dark';

export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Theme {
  breakpoints: Breakpoints;
  borderRadius: BorderRadius;
  spacing: Spacing;
  colors: SemanticColors;
  typography: Record<TypographyVariants, TypographyConfig>;
  boxShadow: BoxShadow;
  mode: Mode;
}
