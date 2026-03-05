import { TypographyConfig } from '../../types';

export const h2Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  responsive: {
    desktop: {
      fontSize: 44,
      lineHeight: 54,
    },
    tablet: {
      fontSize: 36,
      lineHeight: 44,
    },
    mobile: {
      fontSize: 26,
      lineHeight: 34,
    },
  },
};
