import { FunctionComponent, ReactNode } from 'react';
import styled from '@seedui-react/seedui/sc';

const CalloutBox = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(1.75)}px ${theme.spacing(2.25)}px`,
    borderRadius: theme.borderRadius(4),
    backgroundColor: isLight ? theme.colors.info[100] : theme.colors.info[100],
    fontSize: theme.typography.p.fontSize,
    marginBottom: theme.spacing(2),
    '& p': {
      marginBottom: '0 !important',
      color: isLight ? theme.colors.info[500] : theme.colors.info[800],
    },
    '& code': {
      fontSize: theme.typography.caption.fontSize,
      padding: `${theme.spacing(0.25)}px ${theme.spacing(0.75)}px`,
      borderRadius: theme.borderRadius(2),
      backgroundColor: isLight ? theme.colors.info[200] : theme.colors.neutral[500],
      fontFamily: "'SF Mono', 'Fira Code', monospace",
    },
  };
});

export const Callout: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <CalloutBox>{children}</CalloutBox>
);
