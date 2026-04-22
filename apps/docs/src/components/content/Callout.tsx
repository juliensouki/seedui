import { FunctionComponent, ReactNode } from 'react';
import styled from '@seedui-react/seedui/sc';

type CalloutColor = 'info' | 'warning' | 'success' | 'error';

const CalloutBox = styled.div<{ $color: CalloutColor }>(({ theme, $color }) => {
  const isLight = theme.mode === 'light';
  const palette = theme.colors[$color];
  return {
    padding: `${theme.spacing(1.75)}px ${theme.spacing(2.25)}px`,
    borderRadius: theme.borderRadius(4),
    backgroundColor: palette[100],
    fontSize: theme.typography.p.fontSize,
    marginBottom: theme.spacing(2),
    '& p': {
      marginBottom: '0 !important',
      color: isLight ? palette[500] : palette[800],
    },
    '& code': {
      fontSize: theme.typography.caption.fontSize,
      padding: `${theme.spacing(0.25)}px ${theme.spacing(0.75)}px`,
      borderRadius: theme.borderRadius(2),
      backgroundColor: isLight ? palette[200] : theme.colors.neutral[500],
      fontFamily: "'SF Mono', 'Fira Code', monospace",
    },
  };
});

export const Callout: FunctionComponent<{ children?: ReactNode; color?: CalloutColor }> = ({
  children,
  color = 'info',
}) => <CalloutBox $color={color}>{children}</CalloutBox>;
