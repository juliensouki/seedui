import { FunctionComponent } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { CodeBlock } from '../../components/CodeBlock';

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

const PropsTableWrapper = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: 8,
    overflow: 'hidden',
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
  };
});

const Table = styled('table')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 14,
    '& th': {
      textAlign: 'left' as const,
      padding: '10px 16px',
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.03em',
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
      color: theme.colors.neutral[500],
      borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    },
    '& td': {
      padding: '10px 16px',
      borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
      color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
    },
    '& tr:last-child td': {
      borderBottom: 'none',
    },
    '& code': {
      fontSize: 13,
      padding: '2px 6px',
      borderRadius: 4,
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
      fontFamily: "'SF Mono', 'Fira Code', monospace",
    },
  };
});

export const DefaultPropsPage: FunctionComponent = () => {
  return (
    <div>
      <Text variant="h3">Default Props</Text>
      <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
        Set default prop values for any SeedUI component globally through the theme.
      </Text>

      <Divider spacing={28} />

      <Section>
        <SectionTitle>Overview</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Instead of passing the same props to every instance of a component, you can define global
          defaults via the <code>theme.components</code> configuration. This is useful for
          enforcing consistent sizing, colors, or variants across your entire application.
        </Text>
        <Callout>
          Props passed directly to a component instance always take priority over global defaults.
        </Callout>
      </Section>

      <Section>
        <SectionTitle>Basic usage</SectionTitle>
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

      <Section>
        <SectionTitle>Multiple components</SectionTitle>
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

      <Section>
        <SectionTitle>Priority order</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          Props are resolved in the following order, from highest to lowest priority:
        </Text>
        <PropsTableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Source</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1 (highest)</td>
                <td><code>{'<Button size="sm" />'}</code></td>
                <td>Props passed directly to the component instance.</td>
              </tr>
              <tr>
                <td>2</td>
                <td><code>theme.components.button.defaultProps</code></td>
                <td>Global defaults set via ThemeProvider.</td>
              </tr>
              <tr>
                <td>3 (lowest)</td>
                <td>Component built-in defaults</td>
                <td>The component's own internal default values.</td>
              </tr>
            </tbody>
          </Table>
        </PropsTableWrapper>
      </Section>

      <Section>
        <SectionTitle>Combining with styles</SectionTitle>
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

      <Section>
        <SectionTitle>Supported components</SectionTitle>
        <Text variant="p" style={{ marginBottom: 12 }}>
          All SeedUI components that accept props support global default overrides:
        </Text>
        <Text variant="p" style={{ lineHeight: 2 }}>
          <code>button</code> <code>card</code> <code>iconButton</code> <code>input</code>{' '}
          <code>modal</code> <code>popover</code> <code>searchBar</code> <code>select</code>{' '}
          <code>stepper</code> <code>tag</code> <code>text</code> <code>textarea</code>{' '}
          <code>toggle</code> <code>tooltip</code>
        </Text>
      </Section>
    </div>
  );
};
