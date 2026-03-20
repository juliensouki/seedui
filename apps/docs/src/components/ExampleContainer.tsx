import styled from '@seedui-react/seedui/sc';

export const ExampleContainer = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: 24,
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
  };
});
