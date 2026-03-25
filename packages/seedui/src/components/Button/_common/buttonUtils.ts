import { ButtonPresetColors } from './types';

const PRESET_COLORS: ButtonPresetColors[] = ['primary', 'neutral', 'error'];

export const isPresetColor = (color: string): color is ButtonPresetColors =>
  PRESET_COLORS.includes(color as ButtonPresetColors);
