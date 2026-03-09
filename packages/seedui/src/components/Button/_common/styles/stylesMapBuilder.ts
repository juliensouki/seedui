import styled from 'styled-components';

import { StyledComponent, StyledProps } from '../../../../types/internal';
import { applyCustomStyles } from '../../../../utils/custom-styles';
import { ButtonProps } from '../../Button';
import { getNeutralFilledButtonStyles } from './get-neutral-filled-styles';
import { getNeutralTransparentButtonStyles } from './get-neutral-transparent-styles';
import { getPrimaryFilledButtonStyles } from './get-primary-filled-styles';
import { getPrimaryTransparentButtonStyles } from './get-primary-transparent-styles';
import { getErrorFilledButtonStyles } from './get-error-filled-styles';
import { getErrorTransparentButtonStyles } from './get-error-transparent-styles';
import { ButtonColors, ButtonVariants } from '../ButtonCommon';

export const stylesMapBuilder = (
  base: StyledComponent<unknown>,
): Record<ButtonVariants, Record<ButtonColors, typeof base>> => ({
  filled: {
    primary: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getPrimaryFilledButtonStyles(props.theme)),
    ),
    neutral: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getNeutralFilledButtonStyles(props.theme)),
    ),
    error: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getErrorFilledButtonStyles(props.theme)),
    ),
  },
  transparent: {
    primary: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getPrimaryTransparentButtonStyles(props.theme)),
    ),
    neutral: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getNeutralTransparentButtonStyles(props.theme)),
    ),
    error: applyCustomStyles(
      styled(base)((props: StyledProps<ButtonProps>) => getErrorTransparentButtonStyles(props.theme)),
    ),
  },
});
