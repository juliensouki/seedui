import { TypographyConfig } from '../../types';

export const h3Styles: TypographyConfig = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  responsive: {
    desktop: {
      fontSize: 40,
      lineHeight: 48,
    },
    tablet: {
      fontSize: 32,
      lineHeight: 40,
    },
    mobile: {
      fontSize: 26,
      lineHeight: 40,
    },
  },
};
