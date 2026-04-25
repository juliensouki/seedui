import { Theme } from '../types';

interface FocusRingOptions {
  ringColor?: string;
  ringWidth?: number;
  gapColor?: string;
}

export const getFocusRingBoxShadow = (theme: Theme, options: FocusRingOptions = {}): string => {
  const isLight = theme.mode === 'light';
  const ringColor = options.ringColor ?? theme.colors.primary[400];
  const ringWidth = options.ringWidth ?? 2;
  const gapColor = options.gapColor ?? (isLight ? theme.colors.neutral.white : theme.colors.neutral[200]);
  return `0 0 0 1px ${gapColor}, 0 0 0 ${1 + ringWidth}px ${ringColor}`;
};
