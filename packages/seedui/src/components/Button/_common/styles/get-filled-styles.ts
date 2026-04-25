import { TinyColor } from '@ctrl/tinycolor';

import { SemanticColorShades, Theme } from '../../../../types';
import { getFocusRingBoxShadow } from '../../../../utils/focus-ring';

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
      boxShadow: getFocusRingBoxShadow(theme, { ringColor: scale.default }),
    },

    '&:active': {
      backgroundColor: theme.mode === 'light' ? scale[800] : scale[300],
      boxShadow: getFocusRingBoxShadow(theme, {
        ringColor: theme.mode === 'light' ? scale[800] : scale[300],
      }),
    },

    '& svg': {
      color: textColor,
    },
  };
};
