import { CSSProperties, FunctionComponent, ReactNode } from 'react';
import styled from '@seedui-react/seedui/sc';

const Wrapper = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    padding: 24,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    minHeight: 60,
  };
});

interface ComponentDemoProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const ComponentDemo: FunctionComponent<ComponentDemoProps> = ({ children, style }) => (
  <Wrapper style={style}>{children}</Wrapper>
);
