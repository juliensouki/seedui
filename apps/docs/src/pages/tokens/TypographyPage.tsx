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

const MetaGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '4px 20px',
  marginTop: 8,
  fontSize: 12,
  color: theme.colors.neutral[500],
  fontFamily: "'SF Mono', 'Fira Code', monospace",
}));

const MetaLabel = styled('span')(({ theme }) => ({
  color: theme.colors.neutral[400],
}));

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'caption', 'small'] as const;

const tocItems = [
  { id: 'variants', label: 'Variants' },
  { id: 'usage', label: 'Usage' },
];

const usageCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Text variant="h4">Heading 4</Text>
  <Text variant="p">This is body text using the p variant.</Text>
  <Text variant="caption">Caption text for secondary information.</Text>
  <Text variant="small">Small text for fine print.</Text>
</div>`;

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
          const tablet = config.responsive?.tablet;
          const mobile = config.responsive?.mobile;
          return (
            <VariantRow key={variant}>
              <Text variant={variant}>
                {variant} — The quick brown fox jumps over the lazy dog
              </Text>
              <MetaGrid>
                <span><MetaLabel>font:</MetaLabel> {config.fontFamily}</span>
                <span><MetaLabel>weight:</MetaLabel> {config.fontWeight}</span>
                <span><MetaLabel>letter-spacing:</MetaLabel> {config.letterSpacing}</span>
                <span><MetaLabel>size:</MetaLabel> {config.fontSize}{(tablet?.fontSize || mobile?.fontSize) && <MetaLabel> (
                  {tablet?.fontSize && <>tablet: {tablet.fontSize}</>}
                  {tablet?.fontSize && mobile?.fontSize && ', '}
                  {mobile?.fontSize && <>mobile: {mobile.fontSize}</>}
                )</MetaLabel>}</span>
                <span><MetaLabel>line-height:</MetaLabel> {config.lineHeight}{(tablet?.lineHeight || mobile?.lineHeight) && <MetaLabel> (
                  {tablet?.lineHeight && <>tablet: {tablet.lineHeight}</>}
                  {tablet?.lineHeight && mobile?.lineHeight && ', '}
                  {mobile?.lineHeight && <>mobile: {mobile.lineHeight}</>}
                )</MetaLabel>}</span>
              </MetaGrid>
            </VariantRow>
          );
        })}
      </Section>

      <Section id="usage">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Usage</Text>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Use the <code>Text</code> component with a <code>variant</code> prop.
          All variants are responsive and adapt to the current breakpoint automatically.
        </Text>
        <ComponentPlayground code={usageCode} />
      </Section>
      <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
