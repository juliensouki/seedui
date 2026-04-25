import { SemanticColorShades, Theme } from '../../../../types';
import { getFocusRingBoxShadow } from '../../../../utils/focus-ring';

export const getTransparentButtonStyles = (theme: Theme, scale: SemanticColorShades) => {
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: 'transparent',
    color: scale.default,

    '&:hover': {
      backgroundColor: isLight ? scale[100] : scale[200],
      color: scale.default,
    },

    '&:focus': {
      backgroundColor: isLight ? scale[100] : scale[200],
      boxShadow: getFocusRingBoxShadow(theme, { ringColor: isLight ? scale[200] : scale[300] }),
      color: scale.default,
    },

    '&:active': {
      backgroundColor: isLight ? scale[300] : scale[400],
      boxShadow: getFocusRingBoxShadow(theme, { ringColor: isLight ? scale[300] : scale[400] }),
      color: isLight ? scale.default : scale[600],
    },

    '& svg': {
      color: scale.default,
    },

    '&:disabled': {
      backgroundColor: 'transparent',
      color: isLight ? theme.colors.neutral[300] : theme.colors.neutral[400],

      '&:hover, &:active, &:focus': {
        backgroundColor: 'transparent',
        color: isLight ? theme.colors.neutral[300] : theme.colors.neutral[400],
        boxShadow: 'none',
      },
    },
  };
};
