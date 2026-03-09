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

const Table = styled('table')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 14,
    fontFamily: 'inherit',
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
  };
});

const Th = styled('th')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    textAlign: 'left' as const,
    padding: '10px 0px',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: theme.colors.neutral[500],
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
  };
});

const Td = styled('td')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(2)}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[800]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const tocItems = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-props', label: 'Props' },
  { id: 'section-light-dark-mode', label: 'Light and dark mode' },
  { id: 'section-customizing-the-theme', label: 'Customizing the theme' },
  { id: 'section-themecustomization-reference', label: 'ThemeCustomization reference' },
  { id: 'section-accessing-the-theme', label: 'Accessing the theme' },
];

export const ThemeProviderPage: FunctionComponent = () => {
  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">ThemeProvider</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        The root component that provides theming and customization to all seedui components.
      </Text>

      <Divider spacing={28} />

      <Section id="section-overview">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Overview</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Every seedui application must be wrapped in a <code>ThemeProvider</code>. It supplies the
          design tokens (colors, spacing, typography, etc.) and component customizations to the
          entire component tree via React context.
        </Text>
        <CodeBlock code={`import { ThemeProvider } from '@seedui-react/seedui';

function App() {
  return (
    <ThemeProvider mode="light">
      {/* Your app */}
    </ThemeProvider>
  );
}`} />
      </Section>

      <Section id="section-props">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Props</Text>
        <Table>
            <thead>
              <tr>
                <Th>Prop</Th>
                <Th>Type</Th>
                <Th>Default</Th>
                <Th>Description</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td><code>mode</code></Td>
                <Td><code>'light' | 'dark'</code></Td>
                <Td><code>'light'</code></Td>
                <Td>Sets the color mode for the entire application.</Td>
              </tr>
              <tr>
                <Td><code>theme</code></Td>
                <Td><code>ThemeCustomization</code></Td>
                <Td><code>undefined</code></Td>
                <Td>Optional theme customization object. Allows overriding colors, spacing, typography, component styles, and more.</Td>
              </tr>
              <tr>
                <Td><code>children</code></Td>
                <Td><code>ReactNode</code></Td>
                <Td>&mdash;</Td>
                <Td>Your application content.</Td>
              </tr>
            </tbody>
          </Table>
      </Section>

      <Section id="section-light-dark-mode">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Light and dark mode</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Toggle between light and dark mode by changing the <code>mode</code> prop. All seedui
          components and design tokens automatically adapt to the current mode.
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
      </Section>

      <Section id="section-customizing-the-theme">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Customizing the theme</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Pass a <code>ThemeCustomization</code> object to the <code>theme</code> prop to override
          any design token or component behavior globally.
        </Text>
        <CodeBlock code={`import { ThemeProvider, ThemeCustomization } from '@seedui-react/seedui';

const myTheme: ThemeCustomization = {
  colors: {
    light: {
      primary: '#6366f1',   // custom primary color
    },
    dark: {
      primary: '#818cf8',
    },
  },
  spacing: 10,               // base size in px (default: 8)
  typography: {
    h1: {
      fontFamily: '"Poppins", sans-serif',
    },
  },
};

function App() {
  return (
    <ThemeProvider mode="light" theme={myTheme}>
      {/* All components now use your customized theme */}
    </ThemeProvider>
  );
}`} />
      </Section>

      <Section id="section-themecustomization-reference">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>ThemeCustomization reference</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          The full shape of the customization object:
        </Text>
        <Table>
            <thead>
              <tr>
                <Th>Property</Th>
                <Th>Type</Th>
                <Th>Description</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td><code>colors</code></Td>
                <Td><code>{'{ light?, dark? }'}</code></Td>
                <Td>Override semantic colors per mode. Pass a hex string to auto-generate all shades, or provide individual shade overrides.</Td>
              </tr>
              <tr>
                <Td><code>spacing</code></Td>
                <Td><code>number</code></Td>
                <Td>Base size in pixels for the spacing function (default: <code>8</code>). E.g. <code>10</code> makes <code>spacing(1)</code> return 10.</Td>
              </tr>
              <tr>
                <Td><code>typography</code></Td>
                <Td><code>CustomTypographyConfig</code></Td>
                <Td>Override font family, weight, or responsive sizes for any typography variant.</Td>
              </tr>
              <tr>
                <Td><code>borderRadius</code></Td>
                <Td><code>Partial&lt;BorderRadius&gt;</code></Td>
                <Td>Override specific border-radius token values.</Td>
              </tr>
              <tr>
                <Td><code>boxShadow</code></Td>
                <Td><code>{'{ light?, dark? }'}</code></Td>
                <Td>Override box-shadow elevation values per mode.</Td>
              </tr>
              <tr>
                <Td><code>breakpoints</code></Td>
                <Td><code>Partial&lt;Breakpoints&gt;</code></Td>
                <Td>Override responsive breakpoint values.</Td>
              </tr>
              <tr>
                <Td><code>components</code></Td>
                <Td><code>CustomComponents</code></Td>
                <Td>Per-component customization: default props, styles, and conditional styles.</Td>
              </tr>
            </tbody>
          </Table>
      </Section>

      <Section id="section-accessing-the-theme">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Accessing the theme</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          seedui provides two ways to access theme values in your own components:
        </Text>
        <Text variant="p" style={{ marginBottom: 8, fontWeight: 500 }}>
          1. The <code>useTheme</code> hook
        </Text>
        <CodeBlock code={`import { useTheme } from '@seedui-react/seedui';

function MyComponent() {
  const theme = useTheme();
  return <div style={{ color: theme.colors.primary[600] }}>Themed</div>;
}`} />
        <Text variant="p" style={{ marginTop: 16, marginBottom: 8, fontWeight: 500 }}>
          2. The <code>styled</code> utility
        </Text>
        <CodeBlock code={`import { styled } from '@seedui-react/seedui';

const Box = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.colors.primary[100],
  borderRadius: theme.borderRadius(2),
}));`} />
      </Section>
      <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
