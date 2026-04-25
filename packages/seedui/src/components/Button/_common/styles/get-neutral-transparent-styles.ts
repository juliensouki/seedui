import { Theme } from '../../../../types';
import { getFocusRingBoxShadow } from '../../../../utils/focus-ring';

export const getNeutralTransparentButtonStyles = (theme: Theme) => ({
  backgroundColor: 'transparent',
  color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[200] : theme.colors.neutral[300],
  },

  '&:focus': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral.default,
    boxShadow: getFocusRingBoxShadow(theme, {
      ringColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral.default,
    }),
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[400] : theme.colors.neutral[300],
    boxShadow: getFocusRingBoxShadow(theme, {
      ringColor: theme.mode === 'light' ? theme.colors.neutral[400] : theme.colors.neutral[300],
    }),
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
      boxShadow: 'none',
    },
  },
});
