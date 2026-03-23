import { SemanticColorShades } from '../../../../types';

export const getTransparentButtonStyles = (scale: SemanticColorShades) => ({
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
