import { SemanticColorShades, Theme } from '../../../../types';

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
      outline: `2px solid ${isLight ? scale[200] : scale[300]}`,
      outlineOffset: 1,
      color: scale.default,
    },

    '&:active': {
      backgroundColor: isLight ? scale[300] : scale[400],
      outline: `2px solid ${isLight ? scale[300] : scale[400]}`,
      outlineOffset: 1,
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
        outline: 'none',
      },
    },
  };
};
