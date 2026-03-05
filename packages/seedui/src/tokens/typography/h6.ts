import { TypographyConfig } from '../../types';

export const h6Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  responsive: {
    desktop: {
      fontSize: 18,
      lineHeight: 24,
    },
    tablet: {
      fontSize: 16,
      lineHeight: 22,
    },
    mobile: {
      fontSize: 16,
      lineHeight: 22,
    },
  },
};
