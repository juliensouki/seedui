import { TypographyConfig } from '../../types';

export const h5Styles: TypographyConfig = {
  fontFamily: 'Inter Variable',
  fontWeight: 600,
  letterSpacing: 'normal',
  responsive: {
    desktop: {
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
    },
    tablet: {
      fontSize: '1rem',
      lineHeight: '1.375rem',
    },
    mobile: {
      fontSize: '1rem',
      lineHeight: '1.375rem',
    },
  },
};
