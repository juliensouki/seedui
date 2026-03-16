import { FunctionComponent, useState } from 'react';
import { styled } from '@seedui-react/seedui';
import { CodeBlock } from './CodeBlock';

type PkgManager = 'yarn' | 'npm';

const CodeToolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 4,
  padding: '8px 12px',
  backgroundColor: theme.colors.neutral[800],
  borderRadius: '8px 8px 0 0',
}));

const PmButton = styled('button')<{ $active: boolean }>(({ $active, theme }) => ({
  padding: '4px 12px',
  fontSize: 12,
  fontWeight: 500,
  fontFamily: "'SF Mono', 'Fira Code', monospace",
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  transition: 'all 0.15s',
  backgroundColor: $active ? theme.colors.neutral[600] : 'transparent',
  color: $active ? theme.colors.neutral[100] : theme.colors.neutral[500],
  '&:hover': {
    backgroundColor: $active ? theme.colors.neutral[600] : theme.colors.neutral[700],
  },
}));

const TabbedCodeWrapper = styled('div')(() => ({
  '& pre': {
    borderRadius: '0 0 8px 8px',
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
      <CodeBlock code={commands[pm]} language="bash" />
    </TabbedCodeWrapper>
  );
};
