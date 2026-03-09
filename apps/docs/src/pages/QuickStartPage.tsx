import { FunctionComponent } from 'react';
import { styled, Text, Divider, Button } from '@seedui-react/seedui';
import { CodeBlock } from '../components/CodeBlock';
import { TableOfContents } from '../components/TableOfContents';
import { PageNavigation } from '../components/PageNavigation';

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

const tocItems = [
  { id: 'section-minimal-example', label: 'A minimal example' },
  { id: 'section-styled', label: 'Using styled' },
  { id: 'section-use-theme', label: 'Using useTheme' },
];

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
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Quick Start</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Render your first seedui component in under a minute.
      </Text>

      <Divider spacing={28} />

      <Section id="section-minimal-example">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>A minimal example</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          After installing and wrapping your app in <code>ThemeProvider</code>, you can use any seedui component:
        </Text>
        <CodeBlock code={`import { ThemeProvider, Button } from '@seedui-react/seedui';\n\nfunction App() {\n  return (\n    <ThemeProvider mode="light">\n      <Button onClick={() => alert('Hello seedui!')}>\n        Click me\n      </Button>\n    </ThemeProvider>\n  );\n}`} />
        <Text variant="p" style={{ marginTop: 16, marginBottom: 12 }}>
          Here's what the example above looks like when rendered:
        </Text>
        <ExampleContainer>
          <Button onClick={() => alert('Hello seedui!')}>Click me</Button>
        </ExampleContainer>
      </Section>

      <Section id="section-styled">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Using the styled utility</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          seedui re-exports styled-components' <code>styled</code> function with full theme typing.
          Use it to create custom styled elements that access the theme:
        </Text>
        <CodeBlock code={`import { styled } from '@seedui-react/seedui';\n\nconst Container = styled('div')(({ theme }) => ({\n  padding: theme.spacing(3),\n  backgroundColor: theme.colors.primary[100],\n  borderRadius: theme.borderRadius(4),\n}));`} />
      </Section>

      <Section id="section-use-theme">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Using the useTheme hook</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Access theme values directly in your components with <code>useTheme</code>:
        </Text>
        <CodeBlock code={`import { useTheme } from '@seedui-react/seedui';\n\nfunction MyComponent() {\n  const theme = useTheme();\n  return (\n    <div style={{ color: theme.colors.primary[600] }}>\n      Themed content\n    </div>\n  );\n}`} />
      </Section>
      <PageNavigation />
      </MainContent>
      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
