import { FunctionComponent, ReactNode } from 'react';
import { styled } from '@seedui-react/seedui';

const CalloutBox = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '14px 18px',
    borderRadius: 8,
    backgroundColor: isLight ? theme.colors.info[100] : theme.colors.info[900],
    color: isLight ? theme.colors.info[800] : theme.colors.info[200],
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 1.6,
    '& p': {
      marginBottom: '0 !important',
    },
    '& code': {
      fontSize: 13,
      padding: '2px 6px',
      borderRadius: 4,
      backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[700],
      fontFamily: "'SF Mono', 'Fira Code', monospace",
    },
  };
});

export const Callout: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <CalloutBox>{children}</CalloutBox>
);
