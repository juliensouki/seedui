import { FunctionComponent } from 'react';
import { Text } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { PageLayout } from '../../../components/mdx/PageLayout';
import { ComponentPlayground } from '../../../components/content/ComponentPlayground';

const Section = styled('section')(() => ({
  marginBottom: 40,
}));

const Grid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: 16,
}));

const Sample = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 8,
    padding: 16,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    borderRadius: 8,
  };
});

const Box = styled('div')(({ theme }) => ({
  width: 56,
  height: 56,
  backgroundColor: theme.mode === 'light' ? theme.colors.primary[400] : theme.colors.primary.default,
  overflow: 'hidden',
}));

const Label = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 12,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[800],
    textAlign: 'center' as const,
  };
});

const Value = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 11,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
  };
});

const radiusFactors: (number | 'full')[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 'full'];

const usageCode = `<div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
  <Button style={{ borderRadius: useTheme().borderRadius(2) }}>
    borderRadius(2)
  </Button>
  <Button style={{ borderRadius: useTheme().borderRadius(6) }}>
    borderRadius(6)
  </Button>
  <Button style={{ borderRadius: useTheme().borderRadius('full') }}>
    borderRadius('full')
  </Button>
</div>`;

export const BorderRadius: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <PageLayout
      title="Border Radius"
      description="A function-based border radius scale using a 2px base unit."
    >
      <Section id="section-scale">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Scale</Text>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access via <code>theme.borderRadius(factor)</code> — returns the pixel value as a number
          (base &times; factor). Use <code>&apos;full&apos;</code> for pill/circle shapes (9999px).
        </Text>
        <Grid>
          {radiusFactors.map((factor) => {
            const px = theme.borderRadius(factor);
            return (
              <Sample key={String(factor)}>
                <Box style={{ borderRadius: px }} />
                <Label>{typeof factor === 'string' ? `'${factor}'` : factor}</Label>
                <Value>{px}px</Value>
              </Sample>
            );
          })}
        </Grid>
      </Section>

      <Section id="section-usage">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Usage</Text>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access border radius via <code>useTheme()</code> or styled-components theme injection.
        </Text>
        <ComponentPlayground code={usageCode} />
      </Section>
    </PageLayout>
  );
};
