import { FunctionComponent } from 'react';
import { styled, Toggle, useTheme } from '@seedui-react/seedui';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useModeToggle } from './ModeContext';

const ModeToggleRow = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 20px',
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    marginBottom: 12,
    fontSize: 13,
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[700],
  };
});

export const ModeToggleDemo: FunctionComponent = () => {
  const theme = useTheme();
  const toggleMode = useModeToggle();
  const isLight = theme.mode === 'light';

  return (
    <ModeToggleRow>
      {isLight ? <SunIcon size={14} /> : <MoonIcon size={14} />}
      <span>{isLight ? 'Light' : 'Dark'}</span>
      <Toggle size="sm" checked={!isLight} onChange={toggleMode} />
    </ModeToggleRow>
  );
};
