import { FunctionComponent } from 'react';
import { styled, Text, Divider, useTheme, colors } from '@seedui-react/seedui';

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

const semanticNames = ['primary', 'secondary', 'neutral', 'success', 'info', 'warning', 'error'] as const;

const primitiveNames = ['purple', 'turquoise', 'grey', 'blue', 'green', 'orange', 'red'] as const;

export const ColorsPage: FunctionComponent = () => {
  const theme = useTheme();
  const primitives = theme.mode === 'light' ? colors.light.primitive : colors.dark.primitive;

  return (
    <div>
      <Text variant="h3">Colors</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Semantic and primitive color palettes. Semantic colors adapt to light/dark mode.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>Semantic colors</SectionTitle>
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

      <Section>
        <SectionTitle>Primitive colors</SectionTitle>
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
    </div>
  );
};
