import styled from '@juliensouki/seedui/sc';

export const Table = styled.table(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: theme.typography.p.fontSize,
    fontFamily: 'inherit',
    marginBottom: theme.spacing(3),
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[800],
  };
});

export const Th = styled.th(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    textAlign: 'left' as const,
    padding: `${theme.spacing(1.25)}px ${theme.spacing(2)}px ${theme.spacing(1.25)}px 0`,
    fontWeight: 600,
    fontSize: theme.typography.caption.fontSize,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
  };
});

export const Td = styled.td(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[200]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
    '& code': {
      backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
      padding: `${theme.spacing(0.25)}px ${theme.spacing(0.75)}px`,
      borderRadius: theme.borderRadius(2),
      fontSize: '0.9em',
      fontFamily: "'SF Mono', 'Fira Code', monospace",
    },
  };
});
