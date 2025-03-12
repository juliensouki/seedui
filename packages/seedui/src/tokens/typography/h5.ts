import { TypographyConfig } from '../../types';

export const h5Styles: TypographyConfig = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  responsive: {
    desktop: {
      fontSize: 24,
      lineHeight: 28,
      paragraphSpacing: 28,
    },
    tablet: {
      fontSize: 24,
      lineHeight: 28,
      paragraphSpacing: 24,
    },
    mobile: {
      fontSize: 20,
      lineHeight: 20,
      paragraphSpacing: 28,
    },
  },
};
