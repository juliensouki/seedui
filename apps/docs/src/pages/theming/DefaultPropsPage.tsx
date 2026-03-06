import { FunctionComponent } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { CodeBlock } from '../../components/CodeBlock';
import { TableOfContents } from '../../components/TableOfContents';
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

const Table = styled('table')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 14,
    fontFamily: 'inherit',
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
  };
});

const Th = styled('th')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    textAlign: 'left' as const,
    padding: '10px 0px',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: theme.colors.neutral[500],
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
  };
});

const Td = styled('td')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing[200]}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[800]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const tocItems = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-basic-usage', label: 'Basic usage' },
  { id: 'section-multiple-components', label: 'Multiple components' },
  { id: 'section-priority-order', label: 'Priority order' },
  { id: 'section-combining-with-styles', label: 'Combining with styles' },
  { id: 'section-supported-components', label: 'Supported components' },
];

export const DefaultPropsPage: FunctionComponent = () => {
  return (
    <PageLayout>
      <MainContent>
      <Text variant="h3" as="h1">Default Props</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Set default prop values for any seedui component globally through the theme.
      </Text>

      <Divider spacing={28} />

      <Section id="section-overview">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Overview</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Instead of passing the same props to every instance of a component, you can define global
          defaults via the <code>theme.components</code> configuration. This is useful for
          enforcing consistent sizing, colors, or variants across your entire application.
        </Text>
        <Callout>
          Props passed directly to a component instance always take priority over global defaults.
        </Callout>
      </Section>

      <Section id="section-basic-usage">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Basic usage</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Use the <code>defaultProps</code> property within a component's configuration to set
          global defaults.
        </Text>
        <CodeBlock code={`import { ThemeProvider, ThemeCustomization } from '@seedui-react/seedui';

const theme: ThemeCustomization = {
  components: {
    button: {
      defaultProps: {
        size: 'lg',
        variant: 'outlined',
        color: 'secondary',
      },
    },
  },
};

function App() {
  return (
    <ThemeProvider mode="light" theme={theme}>
      {/* This button will be large, outlined, and secondary by default */}
      <Button>Save</Button>

      {/* Instance props override global defaults */}
      <Button size="sm" variant="filled">Cancel</Button>
    </ThemeProvider>
  );
}`} />
      </Section>

      <Section id="section-multiple-components">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Multiple components</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          You can configure defaults for as many components as you need in a single theme object.
        </Text>
        <CodeBlock code={`const theme: ThemeCustomization = {
  components: {
    button: {
      defaultProps: {
        size: 'md',
        variant: 'filled',
      },
    },
    input: {
      defaultProps: {
        size: 'lg',
      },
    },
    tag: {
      defaultProps: {
        size: 'sm',
        variant: 'outlined',
        color: 'neutral',
      },
    },
    modal: {
      defaultProps: {
        size: 'md',
      },
    },
    text: {
      defaultProps: {
        variant: 'p',
      },
    },
  },
};`} />
      </Section>

      <Section id="section-priority-order">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Priority order</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Props are resolved in the following order, from highest to lowest priority:
        </Text>
        <Table>
            <thead>
              <tr>
                <Th>Priority</Th>
                <Th>Source</Th>
                <Th>Description</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>1 (highest)</Td>
                <Td><code>{'<Button size="sm" />'}</code></Td>
                <Td>Props passed directly to the component instance.</Td>
              </tr>
              <tr>
                <Td>2</Td>
                <Td><code>theme.components.button.defaultProps</code></Td>
                <Td>Global defaults set via ThemeProvider.</Td>
              </tr>
              <tr>
                <Td>3 (lowest)</Td>
                <Td>Component built-in defaults</Td>
                <Td>The component's own internal default values.</Td>
              </tr>
            </tbody>
          </Table>
      </Section>

      <Section id="section-combining-with-styles">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Combining with styles</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Default props work together with global style overrides and conditional styles. You can
          use all three in the same component configuration.
        </Text>
        <CodeBlock code={`const theme: ThemeCustomization = {
  components: {
    button: {
      // Set default prop values
      defaultProps: {
        size: 'lg',
        variant: 'filled',
      },
      // Apply styles to all buttons
      styles: {
        borderRadius: '999px',
      },
      // Apply styles conditionally based on props
      conditionalStyles: [
        {
          condition: (props) => props.disabled === true,
          styles: { opacity: 0.4 },
        },
      ],
    },
  },
};`} />
      </Section>

      <Section id="section-supported-components">
        <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Supported components</Text>
        <Text variant="p" style={{ marginBottom: 12 }}>
          All seedui components that accept props support global default overrides:
        </Text>
        <Text variant="p" style={{ lineHeight: 2 }}>
          <code>button</code> <code>card</code> <code>iconButton</code> <code>input</code>{' '}
          <code>modal</code> <code>popover</code> <code>searchBar</code> <code>select</code>{' '}
          <code>stepper</code> <code>tag</code> <code>text</code> <code>textarea</code>{' '}
          <code>toggle</code> <code>tooltip</code>
        </Text>
      </Section>
      <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
