import { CSSObject } from 'styled-components';

import {
  AvatarProps,
  AvatarStackProps,
  ButtonProps,
  CardProps,
  DividerProps,
  IconButtonProps,
  InputProps,
  ModalProps,
  PopoverProps,
  ProgressBarProps,
  SearchBarProps,
  SelectProps,
  SkeletonProps,
  StepperProps,
  TagProps,
  TagSelectorProps,
  TextareaProps,
  TextProps,
  ToggleProps,
  TooltipProps,
} from '../components';
import { BoxShadow, Breakpoints, SemanticColorShades, Theme, TypographyVariants } from './theme';
import { MultiMode } from './internal';
import { MenuItemProps } from '../components/Select/MenuItem';

export type CustomComponentConfiguration<T> = {
  defaultProps?: Partial<T>;
  styles?: CSSObject;
  conditionalStyles?: {
    styles: CSSObject;
    condition: (props: T, theme: Theme) => boolean;
  }[];
};

export interface CustomComponents {
  avatar?: CustomComponentConfiguration<AvatarProps>;
  avatarStack?: CustomComponentConfiguration<AvatarStackProps>;
  button?: CustomComponentConfiguration<ButtonProps>;
  card?: CustomComponentConfiguration<CardProps>;
  divider?: CustomComponentConfiguration<DividerProps>;
  iconButton?: CustomComponentConfiguration<IconButtonProps>;
  input?: CustomComponentConfiguration<InputProps>;
  modal?: CustomComponentConfiguration<ModalProps>;
  popover?: CustomComponentConfiguration<PopoverProps>;
  progressBar?: CustomComponentConfiguration<ProgressBarProps>;
  searchBar?: CustomComponentConfiguration<SearchBarProps>;
  skeleton?: CustomComponentConfiguration<SkeletonProps>;
  stepper?: CustomComponentConfiguration<StepperProps>;
  tag?: CustomComponentConfiguration<TagProps>;
  tagSelector?: CustomComponentConfiguration<TagSelectorProps>;
  text?: CustomComponentConfiguration<TextProps>;
  textarea?: CustomComponentConfiguration<TextareaProps>;
  toggle?: CustomComponentConfiguration<ToggleProps>;
  tooltip?: CustomComponentConfiguration<TooltipProps>;
  select?: CustomComponentConfiguration<SelectProps> & {
    menuItem?: CustomComponentConfiguration<MenuItemProps>;
  };
}

export type CustomTypographyResponsiveConfig = Partial<{
  fontFamily: string;
  fontWeight: string | number;
  letterSpacing: string;
  fontSize: number | string;
  lineHeight: number | string;
  responsive: Partial<
    Record<'tablet' | 'mobile', Partial<{ fontSize: number | string; lineHeight: number | string }>>
  >;
}>;

export type CustomBoxShadow = Partial<{ light: Partial<BoxShadow>; dark: Partial<BoxShadow> }>;

export type CustomTypographyConfig = Partial<Record<TypographyVariants, CustomTypographyResponsiveConfig>>;

export interface CustomizedColors {
  primary?: Partial<SemanticColorShades> | string;
  neutral?: (Partial<SemanticColorShades> & { white: string; black: string }) | string;
  success?: Partial<SemanticColorShades> | string;
  info?: Partial<SemanticColorShades> | string;
  warning?: Partial<SemanticColorShades> | string;
  error?: Partial<SemanticColorShades> | string;
}

export interface ThemeCustomization {
  components?: CustomComponents;
  breakpoints?: Partial<Breakpoints>;
  borderRadius?: number;
  spacing?: number;
  typography?: CustomTypographyConfig;
  boxShadow?: CustomBoxShadow;
  colors?: MultiMode<CustomizedColors>;
}

export interface SeedContextType {
  customizations: ThemeCustomization;
  colorService: {
    generateShades: (mainColor: string, isDark: boolean) => SemanticColorShades | null;
  };
}
