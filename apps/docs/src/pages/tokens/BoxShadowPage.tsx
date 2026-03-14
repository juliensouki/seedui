import { FunctionComponent } from 'react';
import { styled, Text, Divider, useTheme } from '@seedui-react/seedui';
import { TableOfContents } from '../../components/TableOfContents';
import { ComponentPlayground } from '../../components/ComponentPlayground';
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

const tocItems = [
  { id: 'levels', label: 'Levels' },
  { id: 'usage', label: 'Usage' },
];

const usageCode = `const theme = useTheme();

<div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
  <Card elementProps={{ rootDiv: { style: { boxShadow: theme.boxShadow[1], padding: 16 } } }}>
    boxShadow[1]
  </Card>
  <Card elementProps={{ rootDiv: { style: { boxShadow: theme.boxShadow[3], padding: 16 } } }}>
    boxShadow[3]
  </Card>
  <Card elementProps={{ rootDiv: { style: { boxShadow: theme.boxShadow[5], padding: 16 } } }}>
    boxShadow[5]
  </Card>
</div>`;

export const BoxShadowPage: FunctionComponent = () => {
  const theme = useTheme();
  const entries = Object.entries(theme.boxShadow);

  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Box Shadow</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Elevation levels for creating depth and visual hierarchy.
      </Text>

      <Divider spacing={28} />

      <Section id="levels">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Levels</Text>
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
      <Section id="usage">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Usage</Text>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access box shadow via <code>useTheme()</code> or styled-components theme injection.
        </Text>
        <ComponentPlayground code={usageCode} />
      </Section>
      <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
