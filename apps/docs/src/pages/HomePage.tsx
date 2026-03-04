import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Text, Card } from '@seedui-react/seedui';
import { componentDocs, categoryOrder } from '../data/components';
import { gettingStartedPages, tokenPages } from '../data/navigation';

const Grid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 16,
  marginTop: 12,
}));

const ClickableCard = styled(Card)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '16px 20px',
    cursor: 'pointer',
    transition: 'box-shadow 0.15s, border-color 0.15s',
    '&:hover': {
      borderColor: isLight ? theme.colors.primary[300] : theme.colors.primary[600],
      boxShadow: `0 0 0 1px ${isLight ? theme.colors.primary[200] : theme.colors.primary[700]}`,
    },
  };
});

const CardTitle = styled(Text)(() => ({
  fontWeight: 600,
  marginBottom: 4,
}));

const CardDescription = styled(Text)(({ theme }) => ({
  color: theme.colors.neutral[500],
  fontSize: 13,
  lineHeight: 1.4,
}));

const SectionHeading = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    marginTop: 32,
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[300],
  };
});

const gettingStartedDescriptions: Record<string, string> = {
  Installation: 'Install the package and set up fonts and theming.',
  'Quick Start': 'Render your first SeedUI component in under a minute.',
};

const tokenDescriptions: Record<string, string> = {
  Colors: 'Semantic and primitive color palettes.',
  Typography: 'Font families, sizes, and responsive variants.',
  Spacing: 'Consistent spacing scale for layout.',
  'Border Radius': 'Rounding tokens for corners.',
  'Box Shadow': 'Elevation levels for depth.',
  Breakpoints: 'Responsive breakpoints for screen sizes.',
};

export const HomePage: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Text variant="h3">SeedUI</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        A React component library with a flexible design token system. Browse the docs to get started.
      </Text>

      <SectionHeading variant="h5">Getting Started</SectionHeading>
      <Grid>
        {gettingStartedPages.map((page) => (
          <ClickableCard
            key={page.path}
            variant="outlined"
            htmlAttributes={{
              rootDiv: { onClick: () => navigate(page.path) },
            }}
          >
            <CardTitle variant="h6">{page.name}</CardTitle>
            <CardDescription>{gettingStartedDescriptions[page.name]}</CardDescription>
          </ClickableCard>
        ))}
      </Grid>

      <SectionHeading variant="h5">Design Tokens</SectionHeading>
      <Grid>
        {tokenPages.map((page) => (
          <ClickableCard
            key={page.path}
            variant="outlined"
            htmlAttributes={{
              rootDiv: { onClick: () => navigate(page.path) },
            }}
          >
            <CardTitle variant="h6">{page.name}</CardTitle>
            <CardDescription>{tokenDescriptions[page.name]}</CardDescription>
          </ClickableCard>
        ))}
      </Grid>

      {categoryOrder.map((category) => {
        const docs = componentDocs.filter((d) => d.category === category);
        if (docs.length === 0) return null;
        return (
          <div key={category}>
            <SectionHeading variant="h5">{category}</SectionHeading>
            <Grid>
              {docs.map((doc) => (
                <ClickableCard
                  key={doc.name}
                  variant="outlined"
                  htmlAttributes={{
                    rootDiv: { onClick: () => navigate(`/components/${doc.name}`) },
                  }}
                >
                  <CardTitle variant="h6">{doc.name}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </ClickableCard>
              ))}
            </Grid>
          </div>
        );
      })}
    </div>
  );
};
