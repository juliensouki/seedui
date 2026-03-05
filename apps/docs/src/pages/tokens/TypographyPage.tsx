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


const VariantRow = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '20px 0',
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  };
});

const Meta = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 24,
  marginTop: 8,
  fontSize: 12,
  color: theme.colors.neutral[500],
  fontFamily: "'SF Mono', 'Fira Code', monospace",
}));

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'caption', 'small'] as const;

const tocItems = [
  { id: 'variants', label: 'Variants' },
  { id: 'usage', label: 'Usage' },
];

export const TypographyPage: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Typography</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Typography variants with responsive sizing for desktop, tablet, and mobile.
      </Text>

      <Divider spacing={28} />

      <Section id="variants">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Variants</Text>
        {variants.map((variant) => {
          const config = theme.typography[variant];
          const desktop = config.responsive.desktop;
          const tablet = config.responsive.tablet;
          const mobile = config.responsive.mobile;
          return (
            <VariantRow key={variant}>
              <Text variant={variant}>
                {variant} — The quick brown fox jumps over the lazy dog
              </Text>
              <Meta>
                <span>font: {config.fontFamily}</span>
                <span>weight: {config.fontWeight}</span>
                <span>desktop: {desktop.fontSize}/{desktop.lineHeight}px</span>
                <span>tablet: {tablet.fontSize}/{tablet.lineHeight}px</span>
                <span>mobile: {mobile.fontSize}/{mobile.lineHeight}px</span>
              </Meta>
            </VariantRow>
          );
        })}
      </Section>

      <Section id="usage">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Usage</Text>
        <Text variant="p">
          Use the <code>Text</code> component with a <code>variant</code> prop, or access
          the raw values via <code>theme.typography.h1</code> etc.
        </Text>
      </Section>
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
