import { SemanticColorShades, Theme } from '../../../../types';

export const getTransparentButtonStyles = (_theme: Theme, scale: SemanticColorShades) => ({
  backgroundColor: 'transparent',
  color: scale.default,

  '&:hover': {
    backgroundColor: scale[200],
  },

  '&:active': {
    backgroundColor: scale[300],
  },

  '& svg': {
    color: scale.default,
  },
});
