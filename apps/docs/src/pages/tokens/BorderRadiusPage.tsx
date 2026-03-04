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
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    borderRadius: 8,
  };
});

const Box = styled('div')(({ theme }) => ({
  width: 56,
  height: 56,
  backgroundColor: theme.colors.primary[400],
}));

const Label = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 13,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[300],
  };
});

const Value = styled('span')(({ theme }) => ({
  fontSize: 11,
  fontFamily: "'SF Mono', 'Fira Code', monospace",
  color: theme.colors.neutral[500],
}));

export const BorderRadiusPage: FunctionComponent = () => {
  const theme = useTheme();
  const entries = Object.entries(theme.borderRadius).sort(
    ([, a], [, b]) => (a as number) - (b as number),
  );

  return (
    <div>
      <Text variant="h3">Border Radius</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Border radius tokens for consistent rounding across components.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>Scale</SectionTitle>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access via <code>theme.borderRadius['100']</code> (returns the pixel value as a number).
        </Text>
        <Grid>
          {entries.map(([token, px]) => (
            <Sample key={token}>
              <Box style={{ borderRadius: px as number }} />
              <Label>{token}</Label>
              <Value>{px}px</Value>
            </Sample>
          ))}
        </Grid>
      </Section>
    </div>
  );
};
