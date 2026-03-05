import { TypographyConfig } from '../../types';

export const h3Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  responsive: {
    desktop: {
      fontSize: 36,
      lineHeight: 44,
    },
    tablet: {
      fontSize: 30,
      lineHeight: 38,
    },
    mobile: {
      fontSize: 24,
      lineHeight: 32,
    },
  },
};
