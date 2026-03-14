import { TypographyConfig } from '../../types';

export const h3Styles: TypographyConfig = {
  fontFamily: "'Source Serif 4 Variable', serif",
  fontWeight: 600,
  letterSpacing: '-0.01em',
  fontSize: '2.25rem',
  lineHeight: '2.75rem',
  responsive: {
    tablet: { fontSize: '1.875rem', lineHeight: '2.375rem' },
    mobile: { fontSize: '1.5rem', lineHeight: '2rem' },
  },
};
