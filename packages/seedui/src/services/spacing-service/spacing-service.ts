import { Spacing } from '../../types';

export interface SpacingService {
  generateCustomSpacing: (baseSize: number) => Spacing;
}

export const spacingServiceFactory = (): SpacingService => {
  return {
    generateCustomSpacing: (baseSize) => {
      return (factor: number) => baseSize * factor;
    },
  };
};
