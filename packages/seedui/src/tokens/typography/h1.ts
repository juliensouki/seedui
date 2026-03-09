import { TypographyConfig } from '../../types';

export const h1Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  letterSpacing: '-0.02em',
  responsive: {
    desktop: {
      fontSize: '3.5rem',
      lineHeight: '4.25rem',
    },
    tablet: {
      fontSize: '2.75rem',
      lineHeight: '3.375rem',
    },
    mobile: {
      fontSize: '1.875rem',
      lineHeight: '2.5rem',
    },
  },
};
