import { TypographyConfig } from '../../types';

export const h4Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  letterSpacing: '-0.01em',
  responsive: {
    desktop: {
      fontSize: '1.75rem',
      lineHeight: '2.125rem',
    },
    tablet: {
      fontSize: '1.5rem',
      lineHeight: '1.875rem',
    },
    mobile: {
      fontSize: '1.375rem',
      lineHeight: '1.75rem',
    },
  },
};
