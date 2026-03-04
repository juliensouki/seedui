import { FunctionComponent } from 'react';
import { styled, Text, Divider, useTheme } from '@seedui-react/seedui';

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
      color: theme.colors.neutral[500],
      borderBottom: `2px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    },
    '& td': {
      padding: '10px 16px',
      borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
      color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[300],
    },
    '& code': {
      fontFamily: "'SF Mono', 'Fira Code', monospace",
      fontSize: 13,
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
      padding: '2px 6px',
      borderRadius: 4,
    },
  };
});

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
    <div>
      <Text variant="h3">Breakpoints</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Responsive breakpoints for adapting layouts across screen sizes.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>Pixel breakpoints</SectionTitle>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access via <code>theme.breakpoints.sm</code> etc. Values are in pixels.
        </Text>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Min-width query</th>
            </tr>
          </thead>
          <tbody>
            {pixelBreakpoints.map((bp) => (
              <tr key={bp.name}>
                <td><code>{bp.name}</code></td>
                <td>{bp.value}px</td>
                <td><code>@media (min-width: {bp.value}px)</code></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section>
        <SectionTitle>Semantic aliases</SectionTitle>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Convenience aliases that map to the pixel breakpoints above.
        </Text>
        <Table>
          <thead>
            <tr>
              <th>Alias</th>
              <th>Maps to</th>
            </tr>
          </thead>
          <tbody>
            {aliases.map((a) => (
              <tr key={a.name}>
                <td><code>{a.name}</code></td>
                <td><code>{a.mapsTo}</code></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </div>
  );
};
