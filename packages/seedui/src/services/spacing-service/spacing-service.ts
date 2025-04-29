import { Spacing } from '../../types';

export interface SpacingService {
  generateCustomSpacing: (multiplier: number) => Spacing;
}

export const spacingServiceFactory = (): SpacingService => {
  return {
    generateCustomSpacing: (multiplier) => {
      const scale: (keyof Spacing)[] = [
        '0',
        '025',
        '050',
        '075',
        '100',
        '150',
        '200',
        '250',
        '300',
        '350',
        '400',
        '450',
        '500',
        '550',
        '600',
        '650',
        '700',
        '750',
        '800',
        '850',
        '900',
        '950',
        '1000',
      ];
      let spacing: Partial<Spacing> = {};

      scale.map((key) => {
        spacing = {
          ...spacing,
          [key]: 8 * (Number(key) / 100) * multiplier,
        };
      });

      return spacing as Spacing;
    },
  };
};
