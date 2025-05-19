import { CSSObject } from 'styled-components';

import {
  ButtonProps,
  CardProps,
  IconButtonProps,
  InputProps,
  TagProps,
  TextareaProps,
  TextProps,
  TooltipProps,
} from '../components';
import { BorderRadius, BoxShadow, Breakpoints, SemanticColorShades, Theme, TypographyVariants } from './theme';
import { MultiMode } from './internal';

export type CustomComponentConfiguration<T> = {
  defaultProps?: Partial<T>;
  styles?: CSSObject;
  conditionalStyles?: {
    styles: CSSObject;
    condition: (props: T, theme: Theme) => boolean;
  }[];
};

export interface CustomComponents {
  button?: CustomComponentConfiguration<ButtonProps>;
  card?: CustomComponentConfiguration<CardProps>;
  iconButton?: CustomComponentConfiguration<IconButtonProps>;
  input?: CustomComponentConfiguration<InputProps>;
  tag?: CustomComponentConfiguration<TagProps>;
  text?: CustomComponentConfiguration<TextProps>;
  textarea?: CustomComponentConfiguration<TextareaProps>;
  tooltip?: CustomComponentConfiguration<TooltipProps>;
}

export type CustomTypographyResponsiveConfig = Partial<{
  fontFamily: string;
  fontWeight: string | number;
  responsive: Partial<
    Record<'desktop' | 'tablet' | 'mobile', Partial<{ fontSize: number | string; lineHeight: number | string }>>
  >;
}>;

export type CustomBoxShadow = Partial<{ light: Partial<BoxShadow>; dark: Partial<BoxShadow> }>;

export type CustomTypographyConfig = Partial<Record<TypographyVariants, CustomTypographyResponsiveConfig>>;

export interface CustomizedColors {
  primary?: Partial<SemanticColorShades> | string;
  secondary?: Partial<SemanticColorShades> | string;
  neutral?: (Partial<SemanticColorShades> & { white: string; black: string }) | string;
  success?: Partial<SemanticColorShades> | string;
  info?: Partial<SemanticColorShades> | string;
  warning?: Partial<SemanticColorShades> | string;
  error?: Partial<SemanticColorShades> | string;
}

export interface ThemeCustomization {
  components?: CustomComponents;
  breakpoints?: Partial<Breakpoints>;
  borderRadius?: Partial<BorderRadius>;
  spacing?: number;
  typography?: CustomTypographyConfig;
  boxShadow?: CustomBoxShadow;
  colors?: MultiMode<CustomizedColors>;
}

export interface SeedContextType {
  customizations: ThemeCustomization;
}
