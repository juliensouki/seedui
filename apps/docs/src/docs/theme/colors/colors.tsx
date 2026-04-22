import { FunctionComponent, useCallback, useState } from 'react';
import { Text } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { PageLayout } from '../../../components/mdx/PageLayout';
import { ComponentPlayground } from '../../../components/content/ComponentPlayground';

const Section = styled.section(() => ({
  marginBottom: 40,
}));

/* ── Palette block ── */

const PaletteBlock = styled.div(() => ({
  marginBottom: 20,
}));

const PaletteHeader = styled.div(() => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
  marginBottom: 8,
}));

const PaletteNameText = styled.span(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 14,
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[800],
    textTransform: 'capitalize' as const,
  };
});

const PrimitiveBadge = styled.span(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 12,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
  };
});

/* ── Swatch grid ── */

const SwatchGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(9, 1fr)',
  gap: 6,

  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },

  [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const SwatchCard = styled.div(({ theme }) => ({
  borderRadius: 8,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.15s',

  '&:hover': {
    transform: 'scale(1.04)',
  },

  '&:active': {
    transform: 'scale(0.98)',
  },

  [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    '&:hover': {
      transform: 'none',
    },
  },
}));

const SwatchColor = styled.div(() => ({
  height: 52,
  borderRadius: '8px 8px 0 0',
}));

const SwatchInfo = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '6px 8px',
    fontSize: 12,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[800],
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    lineHeight: 1.4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
});

const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const colorConfig = [
  { semantic: 'primary', primitive: 'purple' },
  { semantic: 'neutral', primitive: 'grey' },
  { semantic: 'success', primitive: 'green' },
  { semantic: 'info', primitive: 'blue' },
  { semantic: 'warning', primitive: 'orange' },
  { semantic: 'error', primitive: 'red' },
] as const;

const usageExampleCode = `const theme = useTheme();

<div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
  <Button style={{ backgroundColor: theme.colors.success[500] }}>
    Success 500
  </Button>
  <Button style={{ backgroundColor: theme.colors.error[300] }}>
    Error 300
  </Button>
</div>`;

const ColorPalette: FunctionComponent<{
  semantic: string;
  primitive: string;
  palette: Record<number, string>;
  copiedKey: string | null;
  onCopy: (key: string, value: string) => void;
  isDark: boolean;
}> = ({ semantic, primitive, palette, copiedKey, onCopy, isDark }) => (
  <PaletteBlock>
    <PaletteHeader>
      <PaletteNameText>{semantic}</PaletteNameText>
      <PrimitiveBadge>{primitive}</PrimitiveBadge>
    </PaletteHeader>
    <SwatchGrid>
      {shades.map((shade) => {
        const color = palette[shade];
        if (!color) return null;
        const key = `${semantic}-${shade}`;
        const isCopied = copiedKey === key;
        return (
          <SwatchCard
            key={shade}
            title={`Click to copy ${color}`}
            onClick={() => onCopy(key, color)}
          >
            <SwatchColor style={{ backgroundColor: color, boxShadow: isDark && semantic === 'neutral' && shade === 100 ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : undefined }} />
            <SwatchInfo>
              <span style={{ fontWeight: 600 }}>{shade}</span>
              <span>{isCopied ? 'Copied!' : color}</span>
            </SwatchInfo>
          </SwatchCard>
        );
      })}
    </SwatchGrid>
  </PaletteBlock>
);

export const Colors: FunctionComponent = () => {
  const theme = useTheme();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = useCallback((key: string, value: string) => {
    void navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 1200);
  }, []);

  return (
    <PageLayout
      title="Colors"
      description="Each semantic color maps to a primitive palette. Use semantic names in components so colors stay consistent when customized. Click any swatch to copy its hex value."
    >
      <Section id="section-palettes">
        <Text variant="h4" as="h2" style={{ marginBottom: 16 }}>Palettes</Text>
        {colorConfig.map(({ semantic, primitive }) => (
          <ColorPalette
            key={semantic}
            semantic={semantic}
            primitive={primitive}
            isDark={theme.mode === 'dark'}
            palette={theme.colors[semantic] as unknown as Record<number, string>}
            copiedKey={copiedKey}
            onCopy={copyToClipboard}
          />
        ))}
      </Section>

      <Section id="section-usage">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Usage</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Access semantic colors via <code>useTheme()</code> or through the <code>theme</code> object
          injected in <code>styled()</code> components. Use <code>theme.colors.[name][shade]</code> to
          reference any color from the palette.
        </Text>
        <ComponentPlayground code={usageExampleCode} />
      </Section>
    </PageLayout>
  );
};
