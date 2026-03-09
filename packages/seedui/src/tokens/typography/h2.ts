import { TypographyConfig } from '../../types';

export const h2Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  letterSpacing: '-0.02em',
  responsive: {
    desktop: {
      fontSize: '2.75rem',
      lineHeight: '3.375rem',
    },
    tablet: {
      fontSize: '2.25rem',
      lineHeight: '2.75rem',
    },
    mobile: {
      fontSize: '1.625rem',
      lineHeight: '2.125rem',
    },
  },
};
