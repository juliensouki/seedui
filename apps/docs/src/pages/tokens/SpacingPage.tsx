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
    width: 60,
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

export const SpacingPage: FunctionComponent = () => {
  const theme = useTheme();
  const entries = Object.entries(theme.spacing).sort(
    ([, a], [, b]) => (a as number) - (b as number),
  );

  return (
    <div>
      <Text variant="h3">Spacing</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        A consistent spacing scale used for padding, margins, and gaps.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>Scale</SectionTitle>
        <Text variant="p" style={{ marginBottom: 16 }}>
          Access via <code>theme.spacing['100']</code> (returns the pixel value as a number).
        </Text>
        {entries.map(([token, px]) => (
          <TokenRow key={token}>
            <TokenName>{token}</TokenName>
            <TokenValue>{px}px</TokenValue>
            <Bar style={{ width: Math.max(2, px as number) }} />
          </TokenRow>
        ))}
      </Section>
    </div>
  );
};
