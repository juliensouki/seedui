import { Mode, Theme } from '../../../../types';

export const getSecondaryFilledButtonStyles = (theme: Theme & { mode: Mode }) => ({
  backgroundColor: theme.colors.secondary.default,
  color: theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.secondary[500] : theme.colors.secondary[400],
  },

  '&:active': {
    backgroundColor: theme.colors.secondary[800],
  },

  '& svg': {
    color: theme.colors.neutral.white,
  },
});
