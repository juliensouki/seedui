import { FunctionComponent } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
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

export const InstallationPage: FunctionComponent = () => {
  return (
    <div>
      <Text variant="h3">Installation</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Get SeedUI set up in your React project.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>1. Install the package</SectionTitle>
        <CodeBlock code={`# npm\nnpm install @seedui-react/seedui styled-components\n\n# yarn\nyarn add @seedui-react/seedui styled-components`} />
      </Section>

      <Section>
        <SectionTitle>2. Install fonts</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          SeedUI uses Inter and Poppins. Install them via Fontsource:
        </Text>
        <CodeBlock code={`npm install @fontsource-variable/inter @fontsource/poppins`} />
      </Section>

      <Section>
        <SectionTitle>3. Import fonts</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Import the fonts at the root of your application (e.g. main.tsx):
        </Text>
        <CodeBlock code={`import '@fontsource-variable/inter';\nimport '@fontsource/poppins/400.css';\nimport '@fontsource/poppins/600.css';\nimport '@fontsource/poppins/700.css';`} />
      </Section>

      <Section>
        <SectionTitle>4. Wrap with ThemeProvider</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Wrap your app in SeedUI's ThemeProvider to enable theming:
        </Text>
        <CodeBlock code={`import { ThemeProvider } from '@seedui-react/seedui';\n\nfunction App() {\n  return (\n    <ThemeProvider mode="light">\n      {/* Your app content */}\n    </ThemeProvider>\n  );\n}`} />
      </Section>
    </div>
  );
};
