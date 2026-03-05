import { TypographyConfig } from '../../types';

export const h5Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  responsive: {
    desktop: {
      fontSize: 22,
      lineHeight: 28,
    },
    tablet: {
      fontSize: 20,
      lineHeight: 26,
    },
    mobile: {
      fontSize: 18,
      lineHeight: 24,
    },
  },
};
