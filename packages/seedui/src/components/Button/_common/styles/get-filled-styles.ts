import { TinyColor } from '@ctrl/tinycolor';

import { SemanticColorShades, Theme } from '../../../../types';

const getContrastText = (bgColor: string, theme: Theme): string => {
  const color = new TinyColor(bgColor);
  return color.isLight() ? theme.colors.neutral.black : theme.colors.neutral.white;
};

export const getFilledButtonStyles = (theme: Theme, scale: SemanticColorShades, forcedTextColor?: string) => {
  const textColor = forcedTextColor ?? getContrastText(scale.default, theme);

  return {
    backgroundColor: scale.default,
    color: textColor,

    '&:hover': {
      backgroundColor: theme.mode === 'light' ? scale[500] : scale[400],
    },

    '&:focus': {
      outline: `2px solid ${theme.mode === 'light' ? scale.default : scale.default}`,
      outlineOffset: 1,
    },

    '&:active': {
      backgroundColor: theme.mode === 'light' ? scale[800] : scale[300],
      outline: `2px solid ${theme.mode === 'light' ? scale[800] : scale[300]}`,
      outlineOffset: 1,
    },

    '& svg': {
      color: textColor,
    },
  };
};
