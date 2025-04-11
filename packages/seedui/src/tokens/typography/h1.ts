import { TypographyConfig } from '../../types';

export const h1Styles: TypographyConfig = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  responsive: {
    desktop: {
      fontSize: 60,
      lineHeight: 72,
    },
    tablet: {
      fontSize: 48,
      lineHeight: 56,
    },
    mobile: {
      fontSize: 32,
      lineHeight: 48,
    },
  },
};
