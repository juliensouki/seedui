import { FunctionComponent } from 'react';
import { Toggle } from '@juliensouki/seedui';
import styled, { useTheme } from '@juliensouki/seedui/sc';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useModeToggle } from '../layout/ModeContext';

const ModeToggleRow = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.25),
    padding: `${theme.spacing(2)}px ${theme.spacing(2.5)}px`,
    borderRadius: theme.borderRadius(4),
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    marginBottom: theme.spacing(1.5),
    fontSize: theme.typography.caption.fontSize,
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
