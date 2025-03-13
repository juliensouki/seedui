import { TypographyConfig } from '../../types';

export const h1Styles: TypographyConfig = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  responsive: {
    desktop: {
      fontSize: 60,
      lineHeight: 72,
      paragraphSpacing: 48,
    },
    tablet: {
      fontSize: 48,
      lineHeight: 56,
      paragraphSpacing: 40,
    },
    mobile: {
      fontSize: 32,
      lineHeight: 40,
      paragraphSpacing: 48,
    },
  },
};
