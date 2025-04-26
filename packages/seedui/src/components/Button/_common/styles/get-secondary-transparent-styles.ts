import { Theme } from '../../../../types';

export const getSecondaryTransparentButtonStyles = (theme: Theme) => ({
  backgroundColor: 'transparent',
  color: theme.colors.secondary.default,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.secondary[200] : theme.colors.secondary[900],
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.secondary[300] : theme.colors.secondary[700],
  },

  '& svg': {
    color: theme.colors.secondary.default,
  },
});
