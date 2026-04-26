import { FunctionComponent, useState } from 'react';
import styled from '@juliensouki/seedui/sc';
import { ComponentPlayground } from './ComponentPlayground';

type PkgManager = 'yarn' | 'npm';

const TabbedCodeWrapper = styled.div(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& > div:last-child': {
    borderRadius: `0 0 ${theme.borderRadius(4)}px ${theme.borderRadius(4)}px`,
    borderTop: 'none',
    marginBottom: 0,
    '& > div': {
      borderRadius: `0 0 ${theme.borderRadius(4)}px ${theme.borderRadius(4)}px`,
    },
  },
}));

const CodeToolbar = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'stretch',
    padding: `0 ${theme.spacing(1)}px`,
    backgroundColor: isLight ? theme.colors.neutral[900] : theme.colors.neutral[200],
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    borderBottom: `1px solid rgba(255, 255, 255, 0.12)`,
    borderRadius: `${theme.borderRadius(4)}px ${theme.borderRadius(4)}px 0 0`,
  };
});

const PmButton = styled.button<{ $active: boolean }>(({ $active, theme }) => {
  const isLight = theme.mode === 'light';
  const activeColor = isLight ? theme.colors.primary[400] : theme.colors.primary[700];
  const inactiveColor = isLight ? theme.colors.neutral[400] : theme.colors.neutral[800];
  const hoverColor = isLight ? theme.colors.neutral.white : theme.colors.neutral[900];
  return {
    position: 'relative',
    padding: `${theme.spacing(1.25)}px ${theme.spacing(1.5)}px`,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: $active ? 600 : 500,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'color 0.15s ease',
    color: $active ? activeColor : inactiveColor,
    '&::after': {
      content: '""',
      position: 'absolute',
      left: theme.spacing(1.5),
      right: theme.spacing(1.5),
      bottom: -1,
      height: 2,
      backgroundColor: $active ? activeColor : 'transparent',
      borderRadius: `${theme.borderRadius(1)}px ${theme.borderRadius(1)}px 0 0`,
      transition: 'background-color 0.15s ease',
    },
    '&:hover': {
      color: $active ? activeColor : hoverColor,
    },
    '&:focus-visible': {
      outline: 'none',
      color: $active ? activeColor : hoverColor,
    },
    '&:focus-visible::after': {
      backgroundColor: activeColor,
      opacity: $active ? 1 : 0.4,
    },
  };
});

export const TabbedCode: FunctionComponent<{ commands: Record<PkgManager, string> }> = ({ commands }) => {
  const [pm, setPm] = useState<PkgManager>('yarn');
  return (
    <TabbedCodeWrapper>
      <CodeToolbar role="tablist">
        <PmButton role="tab" aria-selected={pm === 'yarn'} $active={pm === 'yarn'} onClick={() => setPm('yarn')}>yarn</PmButton>
        <PmButton role="tab" aria-selected={pm === 'npm'} $active={pm === 'npm'} onClick={() => setPm('npm')}>npm</PmButton>
      </CodeToolbar>
      <ComponentPlayground code={commands[pm]} readOnly language="bash" />
    </TabbedCodeWrapper>
  );
};
