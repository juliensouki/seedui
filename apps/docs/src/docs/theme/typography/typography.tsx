import { FunctionComponent } from 'react';
import { Text } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { PageLayout } from '../../../components/mdx/PageLayout';
import { ComponentPlayground } from '../../../components/content/ComponentPlayground';

const Section = styled('section')(() => ({
  marginBottom: 40,
}));

const VariantRow = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '20px 0',
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  };
});

const MetaGrid = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '4px 20px',
    marginTop: 8,
    fontSize: 12,
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    fontFamily: "'SF Mono', 'Fira Code', monospace",
  };
});

const MetaLabel = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
  };
});

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'caption', 'small'] as const;

const usageCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Text variant="h4">Heading 4</Text>
  <Text variant="p">This is body text using the p variant.</Text>
  <Text variant="caption">Caption text for secondary information.</Text>
  <Text variant="small">Small text for fine print.</Text>
</div>`;

export const Typography: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <PageLayout
      title="Typography"
      description="Typography variants with responsive sizing for desktop, tablet, and mobile."
    >
      <Section id="section-variants">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>
          Variants
        </Text>
        {variants.map((variant) => {
          const config = theme.typography[variant];
          const tablet = config.responsive?.tablet;
          const mobile = config.responsive?.mobile;
          return (
            <VariantRow key={variant}>
              <Text variant={variant}>{variant} — Hello World!</Text>
              <MetaGrid>
                <span>
                  <MetaLabel>font:</MetaLabel> {config.fontFamily}
                </span>
                <span>
                  <MetaLabel>weight:</MetaLabel> {config.fontWeight}
                </span>
                <span>
                  <MetaLabel>letter-spacing:</MetaLabel> {config.letterSpacing}
                </span>
                <span>
                  <MetaLabel>size:</MetaLabel> {config.fontSize}
                  {(tablet?.fontSize || mobile?.fontSize) && (
                    <MetaLabel>
                      {' '}
                      ({tablet?.fontSize && <>tablet: {tablet.fontSize}</>}
                      {tablet?.fontSize && mobile?.fontSize && ', '}
                      {mobile?.fontSize && <>mobile: {mobile.fontSize}</>})
                    </MetaLabel>
                  )}
                </span>
                <span>
                  <MetaLabel>line-height:</MetaLabel> {config.lineHeight}
                  {(tablet?.lineHeight || mobile?.lineHeight) && (
                    <MetaLabel>
                      {' '}
                      ({tablet?.lineHeight && <>tablet: {tablet.lineHeight}</>}
                      {tablet?.lineHeight && mobile?.lineHeight && ', '}
                      {mobile?.lineHeight && <>mobile: {mobile.lineHeight}</>})
                    </MetaLabel>
                  )}
                </span>
              </MetaGrid>
            </VariantRow>
          );
        })}
      </Section>

      <Section id="section-usage">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>
          Usage
        </Text>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Use the <code>Text</code> component with a <code>variant</code> prop. All variants are responsive and adapt to
          the current breakpoint automatically.
        </Text>
        <ComponentPlayground code={usageCode} />
      </Section>
    </PageLayout>
  );
};
