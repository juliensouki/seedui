import { FunctionComponent } from 'react';
import styled from '@seedui-react/seedui/sc';

export const SchemaWrapper = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: 32,
    borderRadius: 12,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  };
});

export const Box = styled.div<{ $dashed?: boolean }>(({ theme, $dashed }) => {
  const isLight = theme.mode === 'light';
  return {
    position: 'relative',
    border: `1.5px ${$dashed ? 'dashed' : 'solid'} ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[400]}`,
    borderRadius: 8,
    padding: 16,
    backgroundColor: isLight ? 'rgba(255,255,255,0.5)' : theme.colors.neutral[200],
  };
});

export const BoxLabel = styled.span(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    position: 'absolute',
    top: -9,
    left: 12,
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', monospace",
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    padding: '0 6px',
    letterSpacing: '0.02em',
  };
});

export const Row = styled.div(() => ({
  display: 'flex',
  gap: 10,
  alignItems: 'stretch',
}));

export const Col = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));

export const Placeholder = styled.div<{ $grow?: boolean }>(({ theme, $grow }) => {
  const isLight = theme.mode === 'light';
  return {
    flex: $grow ? 1 : undefined,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 14px',
    borderRadius: 6,
    border: `1.5px dashed ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[400]}`,
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', monospace",
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    whiteSpace: 'nowrap',
  };
});

export const CirclePlaceholder = styled.div<{ $size?: number }>(({ theme, $size = 48 }) => {
  const isLight = theme.mode === 'light';
  return {
    width: $size,
    height: $size,
    borderRadius: '50%',
    border: `1.5px dashed ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[400]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', monospace",
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    flexShrink: 0,
  };
});
