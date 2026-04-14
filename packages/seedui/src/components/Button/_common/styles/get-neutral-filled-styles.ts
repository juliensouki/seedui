import { Theme } from '../../../../types';

export const getNeutralFilledButtonStyles = (theme: Theme) => ({
  backgroundColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[500],
  color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,

  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[200] : theme.colors.neutral[600],
  },

  '&:focus': {
    outline: `2px solid ${theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[500]}`,
    outlineOffset: 1,
  },

  '&:active': {
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[500] : theme.colors.neutral[300],
    outline: `2px solid ${theme.mode === 'light' ? theme.colors.neutral[500] : theme.colors.neutral[300]}`,
    outlineOffset: 1,
  },

  '& svg': {
    color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,
  },
});
