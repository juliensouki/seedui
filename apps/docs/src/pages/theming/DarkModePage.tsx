import { FunctionComponent } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { CodeBlock } from '../../components/CodeBlock';
import { TableOfContents } from '../../components/TableOfContents';
import { PageNavigation } from '../../components/PageNavigation';

const PageLayout = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

const MainContent = styled('div')(() => ({
  flex: 1,
  minWidth: 0,
}));

const Section = styled('section')(() => ({
  marginBottom: 40,
}));

const Callout = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '16px 20px',
    borderRadius: 8,
    borderLeft: `3px solid ${theme.colors.info[500]}`,
    backgroundColor: isLight ? theme.colors.info[100] : theme.colors.info[900],
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 1.6,
    '& code': {
      fontSize: 13,
      padding: '2px 6px',
      borderRadius: 4,
      backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[800],
      fontFamily: "'SF Mono', 'Fira Code', monospace",
    },
  };
});

const tocItems = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-toggling-modes', label: 'Toggling modes' },
  { id: 'section-mode-aware-custom-styles', label: 'Mode-aware custom styles' },
  { id: 'section-mode-aware-colors', label: 'Mode-aware color overrides' },
  { id: 'section-conditional-styles', label: 'Conditional component styles' },
];

export const DarkModePage: FunctionComponent = () => {
  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Dark Mode</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Built-in light and dark mode with automatic adaptation across all components and tokens.
      </Text>

      <Divider spacing={28} />

      <Section id="section-overview">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Overview</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          seedui supports light and dark mode out of the box. Set the <code>mode</code> prop
          on <code>ThemeProvider</code> and every component, color token, and box shadow automatically
          adapts &mdash; no extra configuration needed.
        </Text>
        <CodeBlock code={`import { ThemeProvider } from '@seedui-react/seedui';

function App() {
  return (
    <ThemeProvider mode="dark">
      {/* All components render in dark mode */}
    </ThemeProvider>
  );
}`} />
      </Section>

      <Section id="section-toggling-modes">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Toggling modes</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Store the current mode in state and toggle it with a button, system preference, or any
          other mechanism. seedui re-renders all themed components when the mode changes.
        </Text>
        <CodeBlock code={`import { useState } from 'react';
import { ThemeProvider, Mode } from '@seedui-react/seedui';

function App() {
  const [mode, setMode] = useState<Mode>('light');

  return (
    <ThemeProvider mode={mode}>
      <button onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
        Toggle mode
      </button>
      {/* Your app */}
    </ThemeProvider>
  );
}`} />
        <Callout>
          The <code>Mode</code> type is exported from seedui and accepts <code>'light'</code> or <code>'dark'</code>.
        </Callout>
      </Section>

      <Section id="section-mode-aware-custom-styles">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Mode-aware custom styles</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          When building your own styled components, access <code>theme.mode</code> to apply
          different styles per mode.
        </Text>
        <CodeBlock code={`import { styled } from '@seedui-react/seedui';

const Card = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: theme.spacing[300],
    borderRadius: theme.borderRadius[100],
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[800],
    border: \`1px solid \${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}\`,
  };
});`} />
        <Text variant="p" style={{ marginTop: 16, marginBottom: 12 }}>
          You can also use the <code>useTheme</code> hook for the same purpose in regular components:
        </Text>
        <CodeBlock code={`import { useTheme } from '@seedui-react/seedui';

function Banner() {
  const theme = useTheme();
  const isLight = theme.mode === 'light';

  return (
    <div style={{
      backgroundColor: isLight ? theme.colors.primary[100] : theme.colors.primary[900],
      color: isLight ? theme.colors.primary[800] : theme.colors.primary[200],
    }}>
      Mode-aware banner
    </div>
  );
}`} />
      </Section>

      <Section id="section-mode-aware-colors">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Mode-aware color overrides</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          When customizing the theme, you can provide different color overrides for light and dark
          mode independently. Each mode receives its own set of color tokens.
        </Text>
        <CodeBlock code={`import { ThemeProvider, ThemeCustomization } from '@seedui-react/seedui';

const theme: ThemeCustomization = {
  colors: {
    light: {
      primary: '#6366f1',
      neutral: { 100: '#f8f9fa' },
    },
    dark: {
      primary: '#818cf8',
      neutral: { 900: '#0f0f12' },
    },
  },
};

function App() {
  return (
    <ThemeProvider mode="dark" theme={theme}>
      {/* Dark mode uses #818cf8 as primary, light uses #6366f1 */}
    </ThemeProvider>
  );
}`} />
        <Text variant="p" style={{ marginTop: 16, marginBottom: 12 }}>
          Similarly, box shadows can be customized per mode:
        </Text>
        <CodeBlock code={`const theme: ThemeCustomization = {
  boxShadow: {
    light: {
      1: '0 1px 3px rgba(0, 0, 0, 0.08)',
      2: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    dark: {
      1: '0 1px 3px rgba(0, 0, 0, 0.3)',
      2: '0 4px 12px rgba(0, 0, 0, 0.5)',
    },
  },
};`} />
      </Section>

      <Section id="section-conditional-styles">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Conditional component styles</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Use the global <code>conditionalStyles</code> configuration to apply styles to specific
          components based on the current mode.
        </Text>
        <CodeBlock code={`const theme: ThemeCustomization = {
  components: {
    card: {
      conditionalStyles: [
        {
          condition: (_props, theme) => theme.mode === 'dark',
          styles: {
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          },
        },
      ],
    },
    button: {
      conditionalStyles: [
        {
          condition: (_props, theme) => theme.mode === 'dark',
          styles: {
            fontWeight: 500,
          },
        },
      ],
    },
  },
};`} />
      </Section>
      <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
