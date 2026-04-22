import { Theme } from '../../../../types';

export const getNeutralTransparentButtonStyles = (theme: Theme) => ({
  backgroundColor: 'transparent',
  color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[200] : theme.colors.neutral[300],
  },

  '&:focus': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral.default,
    outline: `2px solid ${theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral.default}`,
    outlineOffset: 1,
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[400] : theme.colors.neutral[300],
    outline: `2px solid ${theme.mode === 'light' ? theme.colors.neutral[400] : theme.colors.neutral[300]}`,
    outlineOffset: 1,
  },

  '& svg': {
    color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,
  },

  '&:disabled': {
    backgroundColor: 'transparent',
    color: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[400],

    '&:hover, &:active, &:focus': {
      backgroundColor: 'transparent',
      color: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[400],
      outline: 'none',
    },
  },
});
