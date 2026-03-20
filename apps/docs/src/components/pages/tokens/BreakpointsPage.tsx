import { FunctionComponent } from 'react';
import { styled, Text, Divider, useTheme } from '@seedui-react/seedui';
import { TableOfContents } from '../../TableOfContents';
import { CodeBlock } from '../../CodeBlock';
import { PageNavigation } from '../../PageNavigation';

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
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[800],
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
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
  };
});

const Td = styled('td')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(2)}px 16px ${theme.spacing(2)}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[200]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const tocItems = [
  { id: 'pixel-breakpoints', label: 'Pixel breakpoints' },
  { id: 'semantic-aliases', label: 'Semantic aliases' },
  { id: 'media-query-helpers', label: 'Media query helpers' },
  { id: 'usage', label: 'Usage' },
];

const usageCode = `const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },

  [theme.breakpoints.between('sm', 'lg')]: {
    maxWidth: 960,
  },
}))`;

export const BreakpointsPage: FunctionComponent = () => {
  const theme = useTheme();
  const bp = theme.breakpoints;

  const pixelBreakpoints = [
    { name: 'xs', value: bp.xs },
    { name: 'sm', value: bp.sm },
    { name: 'md', value: bp.md },
    { name: 'lg', value: bp.lg },
    { name: 'xl', value: bp.xl },
  ];

  const aliases = [
    { name: 'mobile', mapsTo: bp.mobile, resolvedValue: bp[bp.mobile] },
    { name: 'tablet', mapsTo: bp.tablet, resolvedValue: bp[bp.tablet] },
    { name: 'desktop', mapsTo: bp.desktop, resolvedValue: bp[bp.desktop] },
  ];

  return (
    <PageLayout>
      <MainContent>
        <Text variant="h3" as="h1">Breakpoints</Text>
        <Text variant="p" style={{ marginTop: 8, color: theme.mode === 'light' ? undefined : theme.colors.neutral[800] }}>
          Responsive breakpoints for adapting layouts across screen sizes.
        </Text>

        <Divider spacing={28} />

        <Section id="pixel-breakpoints">
          <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Pixel breakpoints</Text>
          <Text variant="p" style={{ marginBottom: 16 }}>
            Access via <code>theme.breakpoints.sm</code> etc. Values are in pixels.
          </Text>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Value</Th>
                <Th>Min-width query</Th>
              </tr>
            </thead>
            <tbody>
              {pixelBreakpoints.map((b) => (
                <tr key={b.name}>
                  <Td><code>{b.name}</code></Td>
                  <Td>{b.value}px</Td>
                  <Td><code>@media (min-width: {b.value}px)</code></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>

        <Section id="semantic-aliases">
          <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Semantic aliases</Text>
          <Text variant="p" style={{ marginBottom: 16 }}>
            Convenience aliases that map to the pixel breakpoints above.
          </Text>
          <Table>
            <thead>
              <tr>
                <Th>Alias</Th>
                <Th>Maps to</Th>
                <Th>Resolved value</Th>
              </tr>
            </thead>
            <tbody>
              {aliases.map((a) => (
                <tr key={a.name}>
                  <Td><code>{a.name}</code></Td>
                  <Td><code>{a.mapsTo}</code></Td>
                  <Td>{a.resolvedValue}px</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>

        <Section id="media-query-helpers">
          <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Media query helpers</Text>
          <Text variant="p" style={{ marginBottom: 16 }}>
            Helper methods on <code>theme.breakpoints</code> that return ready-to-use media query strings.
            Use them as keys in styled-component style objects.
          </Text>
          <Table>
            <thead>
              <tr>
                <Th>Method</Th>
                <Th>Returns</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td><code>up(key)</code></Td>
                <Td><code>{bp.up('sm')}</code></Td>
              </tr>
              <tr>
                <Td><code>down(key)</code></Td>
                <Td><code>{bp.down('sm')}</code></Td>
              </tr>
              <tr>
                <Td><code>between(start, end)</code></Td>
                <Td><code>{bp.between('sm', 'lg')}</code></Td>
              </tr>
            </tbody>
          </Table>
        </Section>

        <Section id="usage">
          <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Usage</Text>
          <Text variant="p" style={{ marginBottom: 16 }}>
            Use the helpers inside <code>styled</code> components or access breakpoint values
            via <code>useTheme()</code>.
          </Text>
          <CodeBlock code={usageCode} />
        </Section>

        <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
