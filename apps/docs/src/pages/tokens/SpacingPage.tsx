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


const TokenRow = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '8px 0',
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  };
});

const TokenName = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 100,
    fontSize: 13,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[300],
    flexShrink: 0,
  };
});

const TokenValue = styled('span')(({ theme }) => ({
  width: 50,
  fontSize: 12,
  fontFamily: "'SF Mono', 'Fira Code', monospace",
  color: theme.colors.neutral[500],
  flexShrink: 0,
  textAlign: 'right',
}));

const Bar = styled('div')(({ theme }) => ({
  height: 12,
  borderRadius: 3,
  backgroundColor: theme.colors.primary[400],
  transition: 'width 0.2s',
}));

const tocItems = [
  { id: 'scale', label: 'Scale' },
  { id: 'usage', label: 'Usage' },
];

const spacingFactors = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

const usageCode = `const theme = useTheme();

<div style={{ display: 'flex', gap: theme.spacing(2), alignItems: 'center', flexWrap: 'wrap' }}>
  <Card elementProps={{ rootDiv: { style: { padding: theme.spacing(1) } } }}>
    padding: spacing(1)
  </Card>
  <Card elementProps={{ rootDiv: { style: { padding: theme.spacing(2) } } }}>
    padding: spacing(2)
  </Card>
  <Card elementProps={{ rootDiv: { style: { padding: theme.spacing(4) } } }}>
    padding: spacing(4)
  </Card>
</div>`;

export const SpacingPage: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <PageLayout>
      <MainContent>
        <Text variant="h3" as="h1">Spacing</Text>
        <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
          A function-based spacing scale using an 8px base unit.
        </Text>

        <Divider spacing={28} />

        <Section id="scale">
          <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Scale</Text>
          <Text variant="p" style={{ marginBottom: 16 }}>
            Access via <code>theme.spacing(factor)</code> — returns the pixel value as a number (base &times; factor).
            Any numeric factor is supported.
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

        <Section id="usage">
          <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Usage</Text>
          <Text variant="p" style={{ marginBottom: 16 }}>
            Access spacing via <code>useTheme()</code> or styled-components theme injection.
            The function returns a raw number — append <code>px</code> when used in string templates.
          </Text>
          <ComponentPlayground code={usageCode} />
        </Section>
        <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
