import { FunctionComponent, useState } from 'react';
import styled from '@seedui-react/seedui/sc';
import { ComponentPlayground } from './ComponentPlayground';

type PkgManager = 'yarn' | 'npm';

const CodeToolbar = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    gap: theme.spacing(0.5),
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
    backgroundColor: isLight ? theme.colors.neutral[800] : theme.colors.neutral[300],
    borderRadius: `${theme.borderRadius(4)}px ${theme.borderRadius(4)}px 0 0`,
  };
});

const PmButton = styled('button')<{ $active: boolean }>(({ $active, theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 500,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    border: 'none',
    borderRadius: theme.borderRadius(2),
    cursor: 'pointer',
    transition: 'all 0.15s',
    backgroundColor: $active ? (isLight ? theme.colors.neutral[600] : theme.colors.neutral[400]) : 'transparent',
    color: $active ? (isLight ? theme.colors.neutral[100] : theme.colors.neutral[900]) : (isLight ? theme.colors.neutral[500] : theme.colors.neutral[700]),
    '&:hover': {
      backgroundColor: $active ? (isLight ? theme.colors.neutral[600] : theme.colors.neutral[400]) : (isLight ? theme.colors.neutral[700] : theme.colors.neutral[300]),
    },
  };
});

const TabbedCodeWrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& pre': {
    borderRadius: `0 0 ${theme.borderRadius(4)}px ${theme.borderRadius(4)}px`,
  },
}));

export const TabbedCode: FunctionComponent<{ commands: Record<PkgManager, string> }> = ({ commands }) => {
  const [pm, setPm] = useState<PkgManager>('yarn');
  return (
    <TabbedCodeWrapper>
      <CodeToolbar>
        <PmButton $active={pm === 'yarn'} onClick={() => setPm('yarn')}>yarn</PmButton>
        <PmButton $active={pm === 'npm'} onClick={() => setPm('npm')}>npm</PmButton>
      </CodeToolbar>
      <ComponentPlayground code={commands[pm]} readOnly language="bash" />
    </TabbedCodeWrapper>
  );
};
