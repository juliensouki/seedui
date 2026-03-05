import { FunctionComponent } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { CodeBlock } from '../../components/CodeBlock';

const Section = styled('section')(() => ({
  marginBottom: 40,
}));

const SectionTitle = styled(Text)(({ theme }) => ({
  fontWeight: 600,
  color: theme.colors.neutral[500],
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 12,
}));

const PropsTableWrapper = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: 8,
    overflow: 'hidden',
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
  };
});

const Table = styled('table')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 14,
    '& th': {
      textAlign: 'left' as const,
      padding: '10px 16px',
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.03em',
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
      color: theme.colors.neutral[500],
      borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    },
    '& td': {
      padding: '10px 16px',
      borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
      color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
    },
    '& tr:last-child td': {
      borderBottom: 'none',
    },
    '& code': {
      fontSize: 13,
      padding: '2px 6px',
      borderRadius: 4,
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
      fontFamily: "'SF Mono', 'Fira Code', monospace",
    },
  };
});

export const ThemeProviderPage: FunctionComponent = () => {
  return (
    <div>
      <Text variant="h3">ThemeProvider</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        The root component that provides theming and customization to all SeedUI components.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>Overview</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Every SeedUI application must be wrapped in a <code>ThemeProvider</code>. It supplies the
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

      <Section>
        <SectionTitle>Props</SectionTitle>
        <PropsTableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>mode</code></td>
                <td><code>'light' | 'dark'</code></td>
                <td><code>'light'</code></td>
                <td>Sets the color mode for the entire application.</td>
              </tr>
              <tr>
                <td><code>theme</code></td>
                <td><code>ThemeCustomization</code></td>
                <td><code>undefined</code></td>
                <td>Optional theme customization object. Allows overriding colors, spacing, typography, component styles, and more.</td>
              </tr>
              <tr>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td>&mdash;</td>
                <td>Your application content.</td>
              </tr>
            </tbody>
          </Table>
        </PropsTableWrapper>
      </Section>

      <Section>
        <SectionTitle>Light and dark mode</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Toggle between light and dark mode by changing the <code>mode</code> prop. All SeedUI
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

      <Section>
        <SectionTitle>Customizing the theme</SectionTitle>
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
  spacing: 1.25,             // 25% larger spacing scale
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

      <Section>
        <SectionTitle>ThemeCustomization reference</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          The full shape of the customization object:
        </Text>
        <PropsTableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>colors</code></td>
                <td><code>{'{ light?, dark? }'}</code></td>
                <td>Override semantic colors per mode. Pass a hex string to auto-generate all shades, or provide individual shade overrides.</td>
              </tr>
              <tr>
                <td><code>spacing</code></td>
                <td><code>number</code></td>
                <td>Multiplier applied to the base 8px spacing scale (e.g. <code>1.5</code> makes all spacing 50% larger).</td>
              </tr>
              <tr>
                <td><code>typography</code></td>
                <td><code>CustomTypographyConfig</code></td>
                <td>Override font family, weight, or responsive sizes for any typography variant.</td>
              </tr>
              <tr>
                <td><code>borderRadius</code></td>
                <td><code>Partial&lt;BorderRadius&gt;</code></td>
                <td>Override specific border-radius token values.</td>
              </tr>
              <tr>
                <td><code>boxShadow</code></td>
                <td><code>{'{ light?, dark? }'}</code></td>
                <td>Override box-shadow elevation values per mode.</td>
              </tr>
              <tr>
                <td><code>breakpoints</code></td>
                <td><code>Partial&lt;Breakpoints&gt;</code></td>
                <td>Override responsive breakpoint values.</td>
              </tr>
              <tr>
                <td><code>components</code></td>
                <td><code>CustomComponents</code></td>
                <td>Per-component customization: default props, styles, and conditional styles.</td>
              </tr>
            </tbody>
          </Table>
        </PropsTableWrapper>
      </Section>

      <Section>
        <SectionTitle>Accessing the theme</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          SeedUI provides two ways to access theme values in your own components:
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
  padding: theme.spacing[200],
  backgroundColor: theme.colors.primary[100],
  borderRadius: theme.borderRadius[50],
}));`} />
      </Section>
    </div>
  );
};
