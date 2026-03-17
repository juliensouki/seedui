import { Theme } from '../../../../types';

export const getErrorTransparentButtonStyles = (theme: Theme) => ({
  backgroundColor: 'transparent',
  color: theme.colors.error.default,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.error[200] : theme.colors.error[200],
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.error[300] : theme.colors.error[300],
  },

  '& svg': {
    color: theme.colors.error.default,
  },
});
