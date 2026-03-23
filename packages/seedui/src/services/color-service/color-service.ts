import { semantic } from '../../tokens/colors';
import { CustomizedColors, Mode, SemanticColors, SemanticColorShades } from '../../types';
import { MultiMode } from '../../types/internal';
import { generateShades } from '../../utils/generate-shades';
import { getEntries } from '../../utils/type-helpers';

export interface ColorService {
  generateCustomColors: (custom: Partial<MultiMode<CustomizedColors>>, mode?: Mode) => SemanticColors;
}

export const colorServiceFactory = (): ColorService => {

  const setDefaultColors = (colors: SemanticColors): SemanticColors => {
    for (const [color, values] of getEntries<SemanticColors>(colors)) {
      colors[color].default = values[600];
    }
    return colors;
  };

  return {
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
