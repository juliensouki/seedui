import { FunctionComponent } from 'react';
import { styled, Text, Divider, Button } from '@seedui-react/seedui';
import { CodeBlock } from '../components/CodeBlock';

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

const ExampleContainer = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: 24,
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
  };
});

export const QuickStartPage: FunctionComponent = () => {
  return (
    <div>
      <Text variant="h3">Quick Start</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Render your first SeedUI component in under a minute.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>A minimal example</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          After installing and wrapping your app in ThemeProvider, you can use any SeedUI component:
        </Text>
        <CodeBlock code={`import { ThemeProvider, Button } from '@seedui-react/seedui';\n\nfunction App() {\n  return (\n    <ThemeProvider mode="light">\n      <Button onClick={() => alert('Hello SeedUI!')}>\n        Click me\n      </Button>\n    </ThemeProvider>\n  );\n}`} />
      </Section>

      <Section>
        <SectionTitle>Result</SectionTitle>
        <ExampleContainer>
          <Button onClick={() => alert('Hello SeedUI!')}>Click me</Button>
        </ExampleContainer>
      </Section>

      <Section>
        <SectionTitle>Using the styled utility</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          SeedUI re-exports styled-components' <code>styled</code> function with full theme typing.
          Use it to create custom styled elements that access the theme:
        </Text>
        <CodeBlock code={`import { styled } from '@seedui-react/seedui';\n\nconst Container = styled('div')(({ theme }) => ({\n  padding: theme.spacing[300],\n  backgroundColor: theme.colors.primary[100],\n  borderRadius: theme.borderRadius[100],\n}));`} />
      </Section>

      <Section>
        <SectionTitle>Using the useTheme hook</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Access theme values directly in your components with <code>useTheme</code>:
        </Text>
        <CodeBlock code={`import { useTheme } from '@seedui-react/seedui';\n\nfunction MyComponent() {\n  const theme = useTheme();\n  return (\n    <div style={{ color: theme.colors.primary[600] }}>\n      Themed content\n    </div>\n  );\n}`} />
      </Section>
    </div>
  );
};
