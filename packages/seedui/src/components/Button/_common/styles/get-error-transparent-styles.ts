import { Theme } from '../../../../types';
import { getTransparentButtonStyles } from './get-transparent-styles';

export const getErrorTransparentButtonStyles = (theme: Theme) =>
  getTransparentButtonStyles(theme, theme.colors.error);
