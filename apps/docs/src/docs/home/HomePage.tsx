import { FunctionComponent } from 'react';
import { Text, Divider, Button } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { GithubIcon } from 'lucide-react';
import { WallContent } from './wallOfComponents';

const Section = styled('section')(() => ({
  marginBottom: 40,
}));

const FeatureGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 20,
}));

const FeatureCard = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '20px 24px',
    borderRadius: 10,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
  };
});

const FeatureDescription = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    ...(isLight && { color: theme.colors.neutral[500] }),
    fontSize: 14,
  };
});

const HeroSection = styled('div')(() => ({
  display: 'flex',
  alignItems: 'stretch',
  gap: 0,
  marginTop: -40,
  marginBottom: 0,
  height: 600,
  overflow: 'hidden',
  position: 'relative' as const,
}));

const HeroLeft = styled('div')(() => ({
  flex: '0 0 400px',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  paddingRight: 32,
  position: 'relative' as const,
  zIndex: 2,
}));

const HeroRight = styled('div')(() => ({
  flex: 1,
  overflow: 'hidden',
  minWidth: 0,
  position: 'relative' as const,
}));

const WallFade = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    position: 'absolute' as const,
    top: 0,
    left: -1,
    bottom: 0,
    width: 200,
    zIndex: 10,
    pointerEvents: 'none' as const,
    background: isLight
      ? 'linear-gradient(to right, #ffffff, #ffffff00)'
      : `linear-gradient(to right, ${theme.colors.neutral[100]}, ${theme.colors.neutral[100]}00)`,
  };
});

const ComponentWallWrapper = styled('div')(() => ({}));

const ScrollContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  animation: 'seedui-wall-scroll 60s linear infinite',
  '@keyframes seedui-wall-scroll': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(-50%)' },
  },
}));

export const HomePage: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  return (
    <div>
      <HeroSection>
        <HeroLeft>
          <div>
            <Text variant="h1">seedui</Text>
            <Text variant="p" style={{ marginTop: 8, color: isLight ? theme.colors.neutral[500] : undefined }}>
              A simple and elegant React component library that&apos;s endlessly customizable.
            </Text>
            <Text
              variant="p"
              style={{
                marginTop: 16,
                color: isLight ? theme.colors.neutral[500] : undefined,
              }}
            >
              Everything you need to craft polished applications, internal tools, and delightful user experiences.
            </Text>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <Button
                variant="filled"
                color="primary"
                size="md"
                onClick={() => {
                  window.location.href = '/getting-started/installation';
                }}
              >
                How to install
              </Button>
              <Button
                variant="transparent"
                color="neutral"
                size="md"
                onClick={() => window.open('https://github.com/juliensouki/seedui', '_blank', 'noopener,noreferrer')}
              >
                <GithubIcon size={16} style={{ marginRight: 6 }} />
                View on GitHub
              </Button>
            </div>
          </div>
        </HeroLeft>
        <HeroRight>
          <WallFade />
          <ComponentWallWrapper>
            <ScrollContainer>
              <WallContent />
              <WallContent />
            </ScrollContainer>
          </ComponentWallWrapper>
        </HeroRight>
      </HeroSection>

      <Divider spacing={0} style={{ marginBottom: 28 }} />

      <Section>
        <Text variant="h4" as="h2" style={{ marginBottom: 16 }}>
          Why seedui
        </Text>
        <FeatureGrid>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Clean Foundation
            </Text>
            <FeatureDescription>
              A React component library that aims to look and feel right from the start. Use it as-is or build on top of
              it to create your own design system.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Dark Mode
            </Text>
            <FeatureDescription>
              Built-in light and dark mode support. All components and tokens adapt automatically when you switch modes.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Fully Customizable
            </Text>
            <FeatureDescription>
              Built on styled-components, every token and component can be tailored to your needs. Override anything
              from a single theme object, or create your own themed components using the same tools that power seedui.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Designed in Figma
            </Text>
            <FeatureDescription>
              Every component comes with matching Figma designs, ready to use in your workflows. Designers and
              developers stay in sync from day one.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              AI-Friendly Docs
            </Text>
            <FeatureDescription>
              Documentation is server-side rendered so AI agents and coding assistants can read it directly. Point your
              tools at the docs and let them help you build.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Developer Experience
            </Text>
            <FeatureDescription>
              Fully typed with TypeScript, so you get autocompletion and type safety for every prop, token, and style
              override. Spend less time looking things up and more time building.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      <Divider spacing={0} style={{ marginBottom: 16 }} />
      <Text
        variant="caption"
        style={{
          textAlign: 'center',
          color: isLight ? theme.colors.neutral[500] : undefined,
          paddingBottom: 24,
        }}
      >
        Built by{' '}
        <a
          href="https://github.com/juliensouki"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          Julien Souki-Léon
        </a>
        {' · MIT License · '}
        <a
          href="https://github.com/juliensouki/seedui"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          GitHub
        </a>
      </Text>
    </div>
  );
};
