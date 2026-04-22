import { Text, Card } from '@seedui-react/seedui';
import styled from '@seedui-react/seedui/sc';

export const WallCard = styled(Card)(() => ({
  width: '100%',
  padding: 20,
  boxSizing: 'border-box',
}));

export const MiniLabel = styled.span(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 11,
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    display: 'block',
    marginBottom: 12,
  };
});

export const Row = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

export const SettingRow = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[200]}`,
    '&:last-child': { borderBottom: 'none', paddingBottom: 0 },
    '&:first-child': { paddingTop: 0 },
  };
});

export const StatValue = styled(Text)(() => ({
  fontSize: 28,
  fontWeight: 700,
  lineHeight: 1,
}));

export const StatLabel = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 12,
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    marginTop: 4,
  };
});

export const StatusDot = styled.span<{ $color: string }>(({ $color }) => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: $color,
  marginRight: 6,
}));

export const NotifItem = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
    padding: '10px 12px',
    borderRadius: 8,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    marginBottom: 6,
    '&:last-child': { marginBottom: 0 },
  };
});
