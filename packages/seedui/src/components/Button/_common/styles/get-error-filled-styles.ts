import { Theme } from '../../../../types';

export const getErrorFilledButtonStyles = (theme: Theme) => ({
  backgroundColor: theme.colors.error.default,
  color: theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.error[500] : theme.colors.error[400],
  },

  '&:focus': {
    outline: `2px solid ${theme.colors.error[300]}`,
    outlineOffset: 1,
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.error[800] : theme.colors.error.default,
  },

  '& svg': {
    color: theme.colors.neutral.white,
  },
});
