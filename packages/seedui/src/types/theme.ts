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
  secondary: SemanticColorShades;
  neutral: SemanticColorShades & { white: string; black: string };
  success: SemanticColorShades;
  info: SemanticColorShades;
  warning: SemanticColorShades;
  error: SemanticColorShades;
}

export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Spacing {
  '0': number;
  '025': number;
  '050': number;
  '075': number;
  '100': number;
  '150': number;
  '200': number;
  '250': number;
  '300': number;
  '350': number;
  '400': number;
  '450': number;
  '500': number;
  '550': number;
  '600': number;
  '650': number;
  '700': number;
  '750': number;
  '800': number;
  '850': number;
  '900': number;
  '950': number;
  '1000': number;
}

export interface BorderRadius {
  '0': number;
  '025': number;
  '050': number;
  '075': number;
  '100': number;
  '125': number;
  '150': number;
  '175': number;
  '200': number;
}

export interface TypographyConfig {
  fontFamily: string;
  fontWeight: string | number;
  responsive: Record<'desktop' | 'tablet' | 'mobile', { fontSize: number | string; lineHeight: number | string }>;
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
  mode: Mode;
}
