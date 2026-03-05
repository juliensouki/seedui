import { FunctionComponent } from 'react';
import { styled, Text, Divider, useTheme } from '@seedui-react/seedui';
import { TableOfContents } from '../../components/TableOfContents';

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
    padding: `${theme.spacing[200]}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[800]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const tocItems = [
  { id: 'pixel-breakpoints', label: 'Pixel breakpoints' },
  { id: 'semantic-aliases', label: 'Semantic aliases' },
];

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
    { name: 'mobile', mapsTo: bp.mobile },
    { name: 'tablet', mapsTo: bp.tablet },
  ];

  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Breakpoints</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
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
            {pixelBreakpoints.map((bp) => (
              <tr key={bp.name}>
                <Td><code>{bp.name}</code></Td>
                <Td>{bp.value}px</Td>
                <Td><code>@media (min-width: {bp.value}px)</code></Td>
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
            </tr>
          </thead>
          <tbody>
            {aliases.map((a) => (
              <tr key={a.name}>
                <Td><code>{a.name}</code></Td>
                <Td><code>{a.mapsTo}</code></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
