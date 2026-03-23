import { Theme } from '../../../../types';
import { getFilledButtonStyles } from './get-filled-styles';

export const getErrorFilledButtonStyles = (theme: Theme) =>
  getFilledButtonStyles(theme, theme.colors.error);
