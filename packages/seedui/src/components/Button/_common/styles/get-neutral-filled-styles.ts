import { Theme } from '../../../../types';
import { getFocusRingBoxShadow } from '../../../../utils/focus-ring';

export const getNeutralFilledButtonStyles = (theme: Theme) => ({
  backgroundColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[500],
  color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[200] : theme.colors.neutral[600],
  },

  '&:focus': {
    boxShadow: getFocusRingBoxShadow(theme, {
      ringColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[500],
    }),
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[500] : theme.colors.neutral[300],
    boxShadow: getFocusRingBoxShadow(theme, {
      ringColor: theme.mode === 'light' ? theme.colors.neutral[500] : theme.colors.neutral[300],
    }),
  },

  '& svg': {
    color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,
  },
});
