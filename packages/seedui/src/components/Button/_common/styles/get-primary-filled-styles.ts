import { Theme } from '../../../../types';

export const getPrimaryFilledButtonStyles = (theme: Theme) => ({
  backgroundColor: theme.colors.primary.default,
  color: theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.primary[500] : theme.colors.primary[400],
  },

  '&:active': {
    backgroundColor: theme.colors.primary[800],
  },

  '& svg': {
    color: theme.colors.neutral.white,
  },
});
