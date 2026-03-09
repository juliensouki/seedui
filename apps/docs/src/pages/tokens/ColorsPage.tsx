import { FunctionComponent } from 'react';
import { styled, Text, Divider, useTheme, colors } from '@seedui-react/seedui';
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

const PaletteLabel = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    marginTop: 24,
    marginBottom: 8,
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[300],
    textTransform: 'capitalize' as const,
  };
});

const SwatchRow = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
  gap: 8,
}));

const Swatch = styled('div')(() => ({
  borderRadius: 8,
  overflow: 'hidden',
}));

const SwatchColor = styled('div')(() => ({
  height: 48,
}));

const SwatchInfo = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '6px 8px',
    fontSize: 11,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[600] : theme.colors.neutral[400],
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    borderTop: 'none',
    borderRadius: '0 0 8px 8px',
    lineHeight: 1.3,
  };
});

const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const semanticNames = ['primary', 'neutral', 'success', 'info', 'warning', 'error'] as const;

const primitiveNames = ['purple', 'grey', 'blue', 'green', 'orange', 'red'] as const;

const tocItems = [
  { id: 'semantic-colors', label: 'Semantic colors' },
  { id: 'primitive-colors', label: 'Primitive colors' },
];

export const ColorsPage: FunctionComponent = () => {
  const theme = useTheme();
  const primitives = theme.mode === 'light' ? colors.light.primitive : colors.dark.primitive;

  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Colors</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Semantic and primitive color palettes. Semantic colors adapt to light/dark mode.
      </Text>

      <Divider spacing={28} />

      <Section id="semantic-colors">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Semantic colors</Text>
        <Text variant="p" style={{ marginBottom: 8 }}>
          Use semantic colors via <code>theme.colors.primary[600]</code> etc. They map to primitive palettes and change between modes.
        </Text>
        {semanticNames.map((name) => {
          const palette = theme.colors[name];
          return (
            <div key={name}>
              <PaletteLabel variant="p">{name}</PaletteLabel>
              <SwatchRow>
                {shades.map((shade) => {
                  const color = (palette as Record<number, string>)[shade];
                  return (
                    <Swatch key={shade}>
                      <SwatchColor style={{ backgroundColor: color }} />
                      <SwatchInfo>
                        <div>{shade}</div>
                        <div>{color}</div>
                      </SwatchInfo>
                    </Swatch>
                  );
                })}
              </SwatchRow>
            </div>
          );
        })}
      </Section>

      <Section id="primitive-colors">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Primitive colors</Text>
        <Text variant="p" style={{ marginBottom: 8 }}>
          Raw color palettes available via the <code>colors</code> export. Use semantic colors in components whenever possible.
        </Text>
        {primitiveNames.map((name) => {
          const palette = (primitives as Record<string, Record<number, string>>)[name];
          if (!palette) return null;
          return (
            <div key={name}>
              <PaletteLabel variant="p">{name}</PaletteLabel>
              <SwatchRow>
                {shades.map((shade) => {
                  const color = palette[shade];
                  if (!color) return null;
                  return (
                    <Swatch key={shade}>
                      <SwatchColor style={{ backgroundColor: color }} />
                      <SwatchInfo>
                        <div>{shade}</div>
                        <div>{color}</div>
                      </SwatchInfo>
                    </Swatch>
                  );
                })}
              </SwatchRow>
            </div>
          );
        })}
      </Section>
      <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
