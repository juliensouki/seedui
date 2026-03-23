import styled from 'styled-components';

import { StyledComponent, StyledProps } from '../../../../types/internal';
import { applyCustomStyles } from '../../../../utils/custom-styles';
import { generateShades } from '../../../../utils/generate-shades';
import { ButtonProps } from '../../Button';
import { getNeutralFilledButtonStyles } from './get-neutral-filled-styles';
import { getNeutralTransparentButtonStyles } from './get-neutral-transparent-styles';
import { getFilledButtonStyles } from './get-filled-styles';
import { getTransparentButtonStyles } from './get-transparent-styles';
import { ButtonPresetColors, ButtonVariants } from '../ButtonCommon';

type CustomColorProps = StyledProps<ButtonProps> & { $customColor?: string };

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

export const customStylesBuilder = (
  base: StyledComponent<unknown>,
): Record<ButtonVariants, typeof base> => ({
  filled: applyCustomStyles(
    styled(base)((props: CustomColorProps) => {
      if (!props.$customColor) return {};
      const scale = generateShades(props.$customColor, props.theme.mode === 'dark');
      return scale ? getFilledButtonStyles(props.theme, scale) : {};
    }),
  ),
  transparent: applyCustomStyles(
    styled(base)((props: CustomColorProps) => {
      if (!props.$customColor) return {};
      const scale = generateShades(props.$customColor, props.theme.mode === 'dark');
      return scale ? getTransparentButtonStyles(scale) : {};
    }),
  ),
});
