import { FunctionComponent } from 'react';
import { styled, Text, Divider, ThemeProvider, useTheme } from '@seedui-react/seedui';
import type { ThemeCustomization } from '@seedui-react/seedui';
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
    padding: '10px 16px 10px 0',
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
    padding: `${theme.spacing(2)}px 16px ${theme.spacing(2)}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[800]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const PreviewBox = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    padding: 20,
    marginBottom: 12,
  };
});

const PaletteRow = styled('div')(() => ({
  display: 'flex',
  gap: 3,
  borderRadius: 6,
  overflow: 'hidden',
}));

const PaletteLabel = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 12,
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[600] : theme.colors.neutral[400],
    marginBottom: 6,
    display: 'block',
    textTransform: 'capitalize' as const,
  };
});

const Swatch = styled('div')(() => ({
  flex: 1,
  height: 32,
}));

const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const colorsCustomization: ThemeCustomization = {
  colors: {
    light: {
      primary: '#6366f1',
      success: {
        500: '#22c55e',
        600: '#16a34a',
      },
    },
    dark: {
      primary: '#818cf8',
    },
  },
};

const ColorPalettePreview: FunctionComponent = () => {
  const theme = useTheme();
  const primary = theme.colors.primary as unknown as Record<number, string>;
  const success = theme.colors.success as unknown as Record<number, string>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <PaletteLabel>primary</PaletteLabel>
        <PaletteRow>
          {shades.map(s => (
            <Swatch key={s} style={{ backgroundColor: primary[s] }} title={`${s}: ${primary[s]}`} />
          ))}
        </PaletteRow>
      </div>
      <div>
        <PaletteLabel>success</PaletteLabel>
        <PaletteRow>
          {shades.map(s => (
            <Swatch key={s} style={{ backgroundColor: success[s] }} title={`${s}: ${success[s]}`} />
          ))}
        </PaletteRow>
      </div>
    </div>
  );
};

const tocItems = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-colors', label: 'Colors' },
  { id: 'section-spacing', label: 'Spacing' },
  { id: 'section-typography', label: 'Typography' },
  { id: 'section-border-radius', label: 'Border Radius' },
  { id: 'section-box-shadow', label: 'Box Shadow' },
  { id: 'section-breakpoints', label: 'Breakpoints' },
  { id: 'section-components', label: 'Components' },
];

export const CustomizationPage: FunctionComponent = () => {
  const theme = useTheme();
  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Customization</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Override any design token or component behavior through the ThemeProvider's <code>theme</code> prop.
      </Text>

      <Divider spacing={28} />

      <Section id="section-overview">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Overview</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          The <code>ThemeCustomization</code> object lets you tailor seedui to match your design system.
          Pass it to the <code>theme</code> prop on <code>ThemeProvider</code> and every component in the
          tree will pick up your overrides.
        </Text>
        <CodeBlock code={`import { ThemeProvider, ThemeCustomization } from '@seedui-react/seedui';

const myTheme: ThemeCustomization = {
  colors: { light: { primary: '#6366f1' } },
  spacing: 10,
  typography: { h1: { fontFamily: '"Poppins", sans-serif' } },
  borderRadius: 4,
};

function App() {
  return (
    <ThemeProvider mode="light" theme={myTheme}>
      <YourApp />
    </ThemeProvider>
  );
}`} />
        <Text variant="p" style={{ marginTop: 16, marginBottom: 12 }}>
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
              <Td>Override semantic colors per mode.</Td>
            </tr>
            <tr>
              <Td><code>spacing</code></Td>
              <Td><code>number</code></Td>
              <Td>Base size in pixels for the spacing function (default: 8).</Td>
            </tr>
            <tr>
              <Td><code>typography</code></Td>
              <Td><code>CustomTypographyConfig</code></Td>
              <Td>Override font family, weight, or responsive sizes for any variant.</Td>
            </tr>
            <tr>
              <Td><code>borderRadius</code></Td>
              <Td><code>number</code></Td>
              <Td>Base size in pixels for the border-radius function (default: 2).</Td>
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

      {/* ── Colors ── */}
      <Section id="section-colors">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Colors</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Override semantic color palettes per mode. You can supply a single hex string for any palette
          and seedui will auto-generate all shades, or provide individual shade overrides for finer
          control.
        </Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Available palettes: <code>primary</code>, <code>neutral</code>, <code>success</code>,{' '}
          <code>info</code>, <code>warning</code>, and <code>error</code>.
        </Text>
        <PreviewBox>
          <ThemeProvider mode={theme.mode} theme={colorsCustomization}>
            <ColorPalettePreview />
          </ThemeProvider>
        </PreviewBox>
        <CodeBlock code={`colors: {
  light: {
    primary: '#6366f1',
    success: {
      500: '#22c55e',
      600: '#16a34a',
    },
  },
  dark: {
    primary: '#818cf8',
  },
}`} />
        <Text variant="p" style={{ marginTop: 12 }}>
          For the <code>neutral</code> palette you can also override the <code>white</code> and{' '}
          <code>black</code> values alongside shade numbers.
        </Text>
      </Section>

      {/* ── Spacing ── */}
      <Section id="section-spacing">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Spacing</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          The <code>spacing</code> property sets the base size in pixels used by the{' '}
          <code>theme.spacing()</code> function. The default base is <code>8</code>, so{' '}
          <code>spacing(2)</code> returns <code>16</code>.
        </Text>
        <CodeBlock code={`spacing: 10`} />
      </Section>

      {/* ── Typography ── */}
      <Section id="section-typography">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Typography</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Override font family, weight, letter spacing, or responsive sizes for any typography variant.
          Variants: <code>h1</code> – <code>h6</code>, <code>p</code>, <code>caption</code>,{' '}
          <code>small</code>.
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
              <Td><code>fontFamily</code></Td>
              <Td><code>string</code></Td>
              <Td>CSS font-family value.</Td>
            </tr>
            <tr>
              <Td><code>fontWeight</code></Td>
              <Td><code>string | number</code></Td>
              <Td>CSS font-weight value.</Td>
            </tr>
            <tr>
              <Td><code>letterSpacing</code></Td>
              <Td><code>string</code></Td>
              <Td>CSS letter-spacing value.</Td>
            </tr>
            <tr>
              <Td><code>responsive</code></Td>
              <Td><code>{'{ desktop?, tablet?, mobile? }'}</code></Td>
              <Td>Override <code>fontSize</code> and <code>lineHeight</code> per breakpoint.</Td>
            </tr>
          </tbody>
        </Table>
        <CodeBlock code={`typography: {
  h1: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 800,
    responsive: {
      desktop: { fontSize: '3rem', lineHeight: 1.1 },
      tablet:  { fontSize: '2.25rem' },
      mobile:  { fontSize: '1.75rem' },
    },
  },
  p: {
    fontFamily: '"Lora", serif',
  },
}`} />
      </Section>

      {/* ── Border Radius ── */}
      <Section id="section-border-radius">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Border Radius</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          The <code>borderRadius</code> property sets the base size in pixels used by the{' '}
          <code>theme.borderRadius()</code> function. The default base is <code>2</code>, so{' '}
          <code>borderRadius(4)</code> returns <code>8</code>. Passing <code>'full'</code> always
          returns <code>9999</code>.
        </Text>
        <CodeBlock code={`borderRadius: 4`} />
      </Section>

      {/* ── Box Shadow ── */}
      <Section id="section-box-shadow">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Box Shadow</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Override elevation shadow values independently for light and dark modes. Each mode accepts
          partial overrides of the shadow elevation keys.
        </Text>
        <CodeBlock code={`boxShadow: {
  light: {
    1: '0 2px 8px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)',
    2: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
  },
  dark: {
    1: '0 2px 8px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)',
    2: '0 4px 12px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2)',
  },
}`} />
      </Section>

      {/* ── Breakpoints ── */}
      <Section id="section-breakpoints">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Breakpoints</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Override the pixel values for responsive breakpoints. The defaults are:
        </Text>
        <Table>
          <thead>
            <tr>
              <Th>Key</Th>
              <Th>Default</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr><Td><code>xs</code></Td><Td><code>450</code></Td><Td>Extra-small screens</Td></tr>
            <tr><Td><code>sm</code></Td><Td><code>600</code></Td><Td>Small screens</Td></tr>
            <tr><Td><code>md</code></Td><Td><code>960</code></Td><Td>Medium screens</Td></tr>
            <tr><Td><code>lg</code></Td><Td><code>1200</code></Td><Td>Large screens</Td></tr>
            <tr><Td><code>xl</code></Td><Td><code>1550</code></Td><Td>Extra-large screens</Td></tr>
          </tbody>
        </Table>
        <Text variant="p" style={{ marginTop: 12, marginBottom: 12 }}>
          The semantic aliases <code>mobile</code> (<code>sm</code>), <code>tablet</code> (<code>md</code>),
          and <code>desktop</code> (<code>lg</code>) can also be remapped.
        </Text>
        <CodeBlock code={`breakpoints: {
  sm: 640,
  md: 1024,
  lg: 1280,
  mobile: 'sm',
  tablet: 'md',
  desktop: 'lg',
}`} />
      </Section>

      {/* ── Components ── */}
      <Section id="section-components">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Components</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          The <code>components</code> property lets you set default props, base styles, and conditional
          styles for any seedui component globally. Each component entry accepts:
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
              <Td><code>defaultProps</code></Td>
              <Td><code>Partial&lt;Props&gt;</code></Td>
              <Td>Default prop values applied when the consumer doesn't specify them.</Td>
            </tr>
            <tr>
              <Td><code>styles</code></Td>
              <Td><code>CSSObject</code></Td>
              <Td>Base style overrides applied to every instance of the component.</Td>
            </tr>
            <tr>
              <Td><code>conditionalStyles</code></Td>
              <Td><code>Array</code></Td>
              <Td>An array of <code>{'{ condition, styles }'}</code> entries. Each <code>condition</code> receives <code>(props, theme)</code> and the styles are applied when it returns <code>true</code>.</Td>
            </tr>
          </tbody>
        </Table>
        <Text variant="p" style={{ marginTop: 12 }}>
          All seedui components support global customization. For usage details and examples, see the{' '}
          <a href="/theming/component-styles">Component Styles</a> and{' '}
          <a href="/theming/default-props">Default Props</a> pages.
        </Text>
      </Section>

      <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
