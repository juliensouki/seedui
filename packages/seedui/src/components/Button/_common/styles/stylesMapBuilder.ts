import styled from 'styled-components';

import { SemanticColorShades } from '../../../../types';
import { StyledComponent, StyledProps } from '../../../../types/internal';
import { applyCustomStyles } from '../../../../utils/custom-styles';
import { ButtonProps } from '../../Button';
import { getNeutralFilledButtonStyles } from './get-neutral-filled-styles';
import { getNeutralTransparentButtonStyles } from './get-neutral-transparent-styles';
import { getFilledButtonStyles } from './get-filled-styles';
import { getTransparentButtonStyles } from './get-transparent-styles';
import { ButtonPresetColors, ButtonVariants } from '../types';

type CustomColorProps = StyledProps<ButtonProps> & { $colorScale?: SemanticColorShades };

export const stylesMapBuilder = (
  base: StyledComponent<unknown>,
): Record<ButtonVariants, Record<ButtonPresetColors, typeof base>> => ({
  filled: {
    primary: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getFilledButtonStyles(props.theme, props.theme.colors.primary)),
    ),
    neutral: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getNeutralFilledButtonStyles(props.theme)),
    ),
    error: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getFilledButtonStyles(props.theme, props.theme.colors.error)),
    ),
  },
  transparent: {
    primary: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getTransparentButtonStyles(props.theme.colors.primary)),
    ),
    neutral: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getNeutralTransparentButtonStyles(props.theme)),
    ),
    error: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getTransparentButtonStyles(props.theme.colors.error)),
    ),
  },
});

export const customStylesBuilder = (base: StyledComponent<unknown>): Record<ButtonVariants, typeof base> => ({
  filled: applyCustomStyles(
    styled(base)((props: CustomColorProps) => {
      if (!props.$colorScale) return {};
      return getFilledButtonStyles(props.theme, props.$colorScale);
    }),
  ),
  transparent: applyCustomStyles(
    styled(base)((props: CustomColorProps) => {
      if (!props.$colorScale) return {};
      return getTransparentButtonStyles(props.$colorScale);
    }),
  ),
});
