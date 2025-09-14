import { Theme } from '../../../../types';

export const getNeutralTransparentButtonStyles = (theme: Theme) => ({
  backgroundColor: 'transparent',
  color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[100] : theme.colors.neutral[700],
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[100] : theme.colors.neutral[500],
  },

  '& svg': {
    color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,
  },
});
