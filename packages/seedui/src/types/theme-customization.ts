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
import { Theme } from './theme';

type CustomComponentConfiguration<T> = {
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

export interface CustomTheme {
  components: CustomComponents;
}
