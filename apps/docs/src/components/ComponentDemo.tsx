import { FunctionComponent, ReactNode } from 'react';
import { styled } from '@seedui-react/seedui';

const Wrapper = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    padding: 24,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    minHeight: 60,
  };
});

interface ComponentDemoProps {
  children: ReactNode;
}

export const ComponentDemo: FunctionComponent<ComponentDemoProps> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);
