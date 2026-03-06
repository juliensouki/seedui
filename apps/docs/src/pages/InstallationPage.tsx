import { FunctionComponent, useState } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { CodeBlock } from '../components/CodeBlock';
import { TableOfContents } from '../components/TableOfContents';
import { PageNavigation } from '../components/PageNavigation';

const PageLayout = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

const MainContent = styled('div')(() => ({
  flex: 1,
  minWidth: 0,
}));

const tocItems = [
  { id: 'section-install-package', label: 'Install the package' },
  { id: 'section-install-fonts', label: 'Install fonts' },
  { id: 'section-import-fonts', label: 'Import fonts' },
  { id: 'section-theme-provider', label: 'Wrap with ThemeProvider' },
];

const Section = styled('section')(() => ({
  marginBottom: 40,
}));

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

const installCommands: Record<PkgManager, string> = {
  yarn: 'yarn add @seedui-react/seedui styled-components',
  npm: 'npm install @seedui-react/seedui styled-components',
};

const fontCommands: Record<PkgManager, string> = {
  yarn: 'yarn add @fontsource-variable/inter @fontsource-variable/source-serif-4',
  npm: 'npm install @fontsource-variable/inter @fontsource-variable/source-serif-4',
};

const TabbedCode: FunctionComponent<{ commands: Record<PkgManager, string> }> = ({ commands }) => {
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

export const InstallationPage: FunctionComponent = () => {
  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Installation</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Get seedui set up in your React project.
      </Text>

      <Divider spacing={28} />

      <Section id="section-install-package">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Install the package</Text>
        <TabbedCode commands={installCommands} />
      </Section>

      <Section id="section-install-fonts">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Install fonts</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          seedui uses Inter and Source Serif 4. Install them via Fontsource:
        </Text>
        <TabbedCode commands={fontCommands} />
      </Section>

      <Section id="section-import-fonts">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Import fonts</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Import the fonts at the root of your application (e.g. <code>main.tsx</code>):
        </Text>
        <CodeBlock code={`import '@fontsource-variable/inter';\nimport '@fontsource-variable/source-serif-4';`} />
      </Section>

      <Section id="section-theme-provider">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Wrap with ThemeProvider</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Wrap your app in seedui's <code>ThemeProvider</code> to enable theming:
        </Text>
        <CodeBlock code={`import { ThemeProvider } from '@seedui-react/seedui';\n\nfunction App() {\n  return (\n    <ThemeProvider mode="light">\n      {/* Your app content */}\n    </ThemeProvider>\n  );\n}`} />
      </Section>
      <PageNavigation />
      </MainContent>
      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
