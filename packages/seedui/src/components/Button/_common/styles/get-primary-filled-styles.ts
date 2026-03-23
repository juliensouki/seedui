import { Theme } from '../../../../types';
import { getFilledButtonStyles } from './get-filled-styles';

export const getPrimaryFilledButtonStyles = (theme: Theme) =>
  getFilledButtonStyles(theme, theme.colors.primary);
