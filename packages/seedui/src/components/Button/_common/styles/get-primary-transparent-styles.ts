import { Mode, Theme } from '../../../../types';

export const getPrimaryTransparentButtonStyles = (theme: Theme & { mode: Mode }) => ({
  backgroundColor: 'transparent',
  color: theme.colors.primary.default,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.primary[200] : theme.colors.primary[900],
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.primary[300] : theme.colors.primary[700],
  },

  '& svg': {
    color: theme.colors.primary.default,
  },
});
