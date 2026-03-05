import { TypographyConfig } from '../../types';

export const h4Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  responsive: {
    desktop: {
      fontSize: 28,
      lineHeight: 34,
    },
    tablet: {
      fontSize: 24,
      lineHeight: 30,
    },
    mobile: {
      fontSize: 22,
      lineHeight: 28,
    },
  },
};
