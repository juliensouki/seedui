import { FunctionComponent } from 'react';
import { Text } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { PageLayout } from '../../../components/mdx/PageLayout';
import { ComponentPlayground } from '../../../components/content/ComponentPlayground';

const Section = styled.section(() => ({
  marginBottom: 40,
}));

const TokenRow = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '8px 0',
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  };
});

const TokenName = styled.span(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 100,
    fontSize: 13,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[800],
    flexShrink: 0,
  };
});

const TokenValue = styled.span(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 50,
    fontSize: 12,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    flexShrink: 0,
    textAlign: 'right',
  };
});

const Bar = styled.div(({ theme }) => ({
  height: 12,
  borderRadius: 3,
  backgroundColor: theme.mode === 'light' ? theme.colors.primary[400] : theme.colors.primary.default,
  transition: 'width 0.2s',
}));

const spacingFactors = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

const usageCode = `<div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
  <Card elementProps={{ rootDiv: { style: { padding: useTheme().spacing(1) } } }}>
    <Text variant="p">padding: spacing(1)</Text>
  </Card>
  <Card elementProps={{ rootDiv: { style: { padding: useTheme().spacing(2) } } }}>
    <Text variant="p">padding: spacing(2)</Text>
  </Card>
  <Card elementProps={{ rootDiv: { style: { padding: useTheme().spacing(4) } } }}>
    <Text variant="p">padding: spacing(4)</Text>
  </Card>
</div>`;

export const Spacing: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <PageLayout title="Spacing" description="A function-based spacing scale using an 8px base unit.">
      <Section id="section-scale">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>
          Scale
        </Text>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access via <code>theme.spacing(factor)</code> — returns the pixel value as a number (base &times; factor). Any
          numeric factor is supported.
        </Text>
        {spacingFactors.map((factor) => {
          const px = theme.spacing(factor);
          return (
            <TokenRow key={factor}>
              <TokenName>spacing({factor})</TokenName>
              <TokenValue>{px}px</TokenValue>
              <Bar style={{ width: Math.max(2, px) }} />
            </TokenRow>
          );
        })}
        <TokenRow key="ellipsis">
          <TokenName>...</TokenName>
          <TokenValue />
          <span />
        </TokenRow>
        {(() => {
          const px = theme.spacing(18);
          return (
            <TokenRow key={18}>
              <TokenName>spacing(18)</TokenName>
              <TokenValue>{px}px</TokenValue>
              <Bar style={{ width: Math.max(2, px) }} />
            </TokenRow>
          );
        })()}
      </Section>

      <Section id="section-usage">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>
          Usage
        </Text>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access spacing via <code>useTheme()</code> or styled-components theme injection. The function returns a raw
          number.
        </Text>
        <ComponentPlayground code={usageCode} />
      </Section>
    </PageLayout>
  );
};
