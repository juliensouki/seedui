import { TypographyConfig } from '../../types';

export const h6Styles: TypographyConfig = {
  fontFamily: 'Inter Variable',
  fontWeight: 600,
  letterSpacing: 'normal',
  responsive: {
    desktop: {
      fontSize: '1rem',
      lineHeight: '1.375rem',
    },
    tablet: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    mobile: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },
};
