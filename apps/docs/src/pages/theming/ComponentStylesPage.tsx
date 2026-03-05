import { FunctionComponent } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { CodeBlock } from '../../components/CodeBlock';
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

const Callout = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '16px 20px',
    borderRadius: 8,
    borderLeft: `3px solid ${theme.colors.info[500]}`,
    backgroundColor: isLight ? theme.colors.info[100] : theme.colors.info[900],
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 1.6,
    '& code': {
      fontSize: 13,
      padding: '2px 6px',
      borderRadius: 4,
      backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[800],
      fontFamily: "'SF Mono', 'Fira Code', monospace",
    },
  };
});

const tocItems = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-static-style-overrides', label: 'Static style overrides' },
  { id: 'section-conditional-styles', label: 'Conditional styles' },
  { id: 'section-combining-static-and-conditional-styles', label: 'Combining static and conditional styles' },
  { id: 'section-using-the-theme-in-conditions', label: 'Using the theme in conditions' },
  { id: 'section-supported-components', label: 'Supported components' },
];

export const ComponentStylesPage: FunctionComponent = () => {
  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Component Styles</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Override and extend the styles of any seedui component globally through the theme.
      </Text>

      <Divider spacing={28} />

      <Section id="section-overview">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Overview</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Every seedui component supports global style customization through the{' '}
          <code>theme.components</code> configuration. You can apply static CSS overrides and
          conditional styles that respond to component props and theme values &mdash; all without
          touching individual component instances.
        </Text>
        <Callout>
          Global component styles are applied via the <code>ThemeProvider</code>'s{' '}
          <code>theme</code> prop. They affect every instance of the component across your app.
        </Callout>
      </Section>

      <Section id="section-static-style-overrides">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Static style overrides</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Use the <code>styles</code> property to apply CSS overrides to every instance of a
          component. The value is a standard CSS-in-JS object.
        </Text>
        <CodeBlock code={`import { ThemeProvider, ThemeCustomization } from '@seedui-react/seedui';

const theme: ThemeCustomization = {
  components: {
    button: {
      styles: {
        borderRadius: '999px',     // pill-shaped buttons
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },
    card: {
      styles: {
        border: '2px solid #e2e8f0',
        boxShadow: 'none',
      },
    },
    input: {
      styles: {
        borderRadius: '12px',
      },
    },
  },
};

function App() {
  return (
    <ThemeProvider mode="light" theme={theme}>
      {/* All Buttons are now pill-shaped, all Cards have a border, etc. */}
    </ThemeProvider>
  );
}`} />
      </Section>

      <Section id="section-conditional-styles">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Conditional styles</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Use <code>conditionalStyles</code> to apply styles only when certain conditions are met.
          Each entry has a <code>condition</code> function that receives the component's props and
          the current theme, and a <code>styles</code> object to apply when the condition
          returns <code>true</code>.
        </Text>
        <CodeBlock code={`const theme: ThemeCustomization = {
  components: {
    button: {
      conditionalStyles: [
        {
          // Reduce opacity for all disabled buttons
          condition: (props) => props.disabled === true,
          styles: {
            opacity: 0.4,
            cursor: 'not-allowed',
          },
        },
        {
          // Add a ring to primary buttons
          condition: (props, theme) =>
            props.color === 'primary' && props.variant === 'filled',
          styles: {
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.3)',
          },
        },
      ],
    },
  },
};`} />
        <Text variant="p" style={{ marginTop: 16, marginBottom: 12 }}>
          Conditional styles are evaluated in order. When multiple conditions match, their styles
          are merged, with later entries taking precedence.
        </Text>
      </Section>

      <Section id="section-combining-static-and-conditional-styles">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Combining static and conditional styles</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          You can use both <code>styles</code> and <code>conditionalStyles</code> together. Static
          styles are applied first, then conditional styles are layered on top.
        </Text>
        <CodeBlock code={`const theme: ThemeCustomization = {
  components: {
    tag: {
      // Base styles for all tags
      styles: {
        fontWeight: 600,
        borderRadius: '999px',
      },
      // Additional styles based on props
      conditionalStyles: [
        {
          condition: (props) => props.size === 'sm',
          styles: {
            fontSize: '11px',
            padding: '2px 8px',
          },
        },
        {
          condition: (props) => props.size === 'lg',
          styles: {
            fontSize: '15px',
            padding: '8px 16px',
          },
        },
      ],
    },
  },
};`} />
      </Section>

      <Section id="section-using-the-theme-in-conditions">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Using the theme in conditions</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          The <code>condition</code> function receives the current theme as its second argument,
          allowing you to write mode-aware or token-aware conditional styles.
        </Text>
        <CodeBlock code={`const theme: ThemeCustomization = {
  components: {
    card: {
      conditionalStyles: [
        {
          // Apply a glow effect only in dark mode
          condition: (_props, theme) => theme.mode === 'dark',
          styles: {
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          },
        },
      ],
    },
  },
};`} />
      </Section>

      <Section id="section-supported-components">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Supported components</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          The following components support global style customization:
        </Text>
        <Text variant="p" style={{ lineHeight: 2 }}>
          <code>button</code> <code>card</code> <code>iconButton</code> <code>input</code>{' '}
          <code>modal</code> <code>popover</code> <code>searchBar</code> <code>select</code>{' '}
          <code>stepper</code> <code>tag</code> <code>text</code> <code>textarea</code>{' '}
          <code>toggle</code> <code>tooltip</code>
        </Text>
      </Section>
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
