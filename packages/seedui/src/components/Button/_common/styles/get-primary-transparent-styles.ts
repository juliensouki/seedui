import { Theme } from '../../../../types';
import { getTransparentButtonStyles } from './get-transparent-styles';

export const getPrimaryTransparentButtonStyles = (theme: Theme) =>
  getTransparentButtonStyles(theme, theme.colors.primary);
