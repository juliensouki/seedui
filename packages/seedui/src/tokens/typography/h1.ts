import { TypographyConfig } from '../../types';

export const h1Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  letterSpacing: '-0.02em',
  responsive: {
    desktop: {
      fontSize: 56,
      lineHeight: 68,
    },
    tablet: {
      fontSize: 44,
      lineHeight: 54,
    },
    mobile: {
      fontSize: 30,
      lineHeight: 40,
    },
  },
};
