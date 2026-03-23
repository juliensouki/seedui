import { TinyColor } from '@ctrl/tinycolor';

import { SemanticColorShades } from '../types';

/**
 * Generates a full shade scale (100–900 + default) from a single hex color.
 * The input color becomes the 600 shade. Lighter/darker shades are derived
 * using 15% tint/shade steps, flipped for dark mode.
 */
export const generateShades = (mainColor: string, isDark: boolean): SemanticColorShades | null => {
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
