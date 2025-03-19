import { Mode, Theme } from '../../../../types';

export const getNeutralFilledButtonStyles = (theme: Theme & { mode: Mode }) => ({
  backgroundColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[500],
  color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[200] : theme.colors.neutral[400],
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[500] : theme.colors.neutral[700],
  },

  '& svg': {
    color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,
  },
});
