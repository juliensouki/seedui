import { TypographyConfig } from '../../types';

export const h4Styles: TypographyConfig = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  responsive: {
    desktop: {
      fontSize: 32,
      lineHeight: 36,
      paragraphSpacing: 32,
    },
    tablet: {
      fontSize: 28,
      lineHeight: 32,
      paragraphSpacing: 28,
    },
    mobile: {
      fontSize: 24,
      lineHeight: 28,
      paragraphSpacing: 32,
    },
  },
};
