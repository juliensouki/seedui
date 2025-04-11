import { TypographyConfig } from '../../types';

export const h2Styles: TypographyConfig = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  responsive: {
    desktop: {
      fontSize: 48,
      lineHeight: 56,
    },
    tablet: {
      fontSize: 40,
      lineHeight: 48,
    },
    mobile: {
      fontSize: 28,
      lineHeight: 40,
    },
  },
};
