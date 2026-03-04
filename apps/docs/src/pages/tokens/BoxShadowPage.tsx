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
  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
  gap: 24,
}));

const ShadowCard = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
    borderRadius: 12,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[700],
    height: 120,
  };
});

const Label = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 13,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[300],
  };
});

const ShadowValue = styled('span')(({ theme }) => ({
  fontSize: 10,
  fontFamily: "'SF Mono', 'Fira Code', monospace",
  color: theme.colors.neutral[500],
  textAlign: 'center' as const,
  lineHeight: 1.4,
  wordBreak: 'break-all' as const,
}));

export const BoxShadowPage: FunctionComponent = () => {
  const theme = useTheme();
  const entries = Object.entries(theme.boxShadow);

  return (
    <div>
      <Text variant="h3">Box Shadow</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Elevation levels for creating depth and visual hierarchy.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>Levels</SectionTitle>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access via <code>theme.boxShadow[1]</code> through <code>theme.boxShadow[5]</code>.
        </Text>
        <Grid>
          {entries.map(([level, shadow]) => (
            <ShadowCard key={level} style={{ boxShadow: shadow as string }}>
              <Label>Level {level}</Label>
              <ShadowValue>{shadow as string}</ShadowValue>
            </ShadowCard>
          ))}
        </Grid>
      </Section>
    </div>
  );
};
