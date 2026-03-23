import { TinyColor } from '@ctrl/tinycolor';

import { semantic } from '../../tokens/colors';
import { CustomizedColors, Mode, SemanticColors, SemanticColorShades } from '../../types';
import { MultiMode } from '../../types/internal';
import { getEntries } from '../../utils/type-helpers';

export interface ColorService {
  generateCustomColors: (custom: Partial<MultiMode<CustomizedColors>>, mode?: Mode) => SemanticColors;
  generateShades: (mainColor: string, isDark: boolean) => SemanticColorShades | null;
}

export const colorServiceFactory = (): ColorService => {
  const generateShades = (mainColor: string, isDark: boolean): SemanticColorShades | null => {
    const hexColor = new TinyColor(mainColor);

    if (!hexColor.isValid) {
      return null;
    }

    let shades: Partial<SemanticColorShades> = {};

    for (let i = 1; i < 10; i++) {
      let newColor;

      if (isDark) {
        if (i < 6) {
          newColor = hexColor.clone().shade((6 - i) * 15);
        } else if (i === 6) {
          newColor = hexColor;
        } else {
          newColor = hexColor.clone().tint((i - 6) * 15);
        }
      } else {
        if (i < 6) {
          newColor = hexColor.clone().tint((6 - i) * 15);
        } else if (i === 6) {
          newColor = hexColor;
        } else {
          newColor = hexColor.clone().shade((i - 6) * 15);
        }
      }
      shades = { ...shades, [`${i}00`]: `#${newColor.toHex()}` };
    }

    shades.default = shades[600]!;
    return shades as SemanticColorShades;
  };

  const setDefaultColors = (colors: SemanticColors): SemanticColors => {
    for (const [color, values] of getEntries<SemanticColors>(colors)) {
      colors[color].default = values[600];
    }
    return colors;
  };

  return {
    generateShades,
    generateCustomColors: (customColorsByMode, mode = 'light') => {
      if (!customColorsByMode || !customColorsByMode[mode]) return semantic[mode];

      const isDark = mode === 'dark';
      const newColors: Partial<SemanticColors> = {};
      const customColors = customColorsByMode[mode];

      for (const [color, defaultValue] of getEntries<SemanticColors>(semantic[mode])) {
        const customValue = customColors[color];

        if (!customValue) {
          newColors[color] = defaultValue as SemanticColorShades & { white: string; black: string };
        } else {
          if (typeof customValue === 'string') {
            const newShade = generateShades(customValue, isDark);
            newColors[color] = (newShade || defaultValue) as SemanticColorShades & { white: string; black: string };
          } else if (typeof customValue === 'object') {
            newColors[color] = { ...defaultValue, ...customValue } as SemanticColorShades & {
              white: string;
              black: string;
            };
          }
        }
      }
      return setDefaultColors(newColors as SemanticColors);
    },
  };
};
