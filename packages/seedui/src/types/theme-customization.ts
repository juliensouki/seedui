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
import { BorderRadius, Breakpoints, Theme, TypographyVariants } from './theme';

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

export type CustomTypographyConfig = Partial<Record<TypographyVariants, CustomTypographyResponsiveConfig>>;

export interface ThemeCustomization {
  components?: CustomComponents;
  breakpoints?: Partial<Breakpoints>;
  borderRadius?: Partial<BorderRadius>;
  spacing?: number;
  typography?: CustomTypographyConfig;
}

export interface SeedContextType {
  customizations: ThemeCustomization;
}
