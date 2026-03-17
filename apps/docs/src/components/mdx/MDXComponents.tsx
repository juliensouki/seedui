import { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { CodeBlock } from '../CodeBlock';

const StyledSection = styled('section')(() => ({
  marginBottom: 40,
}));

const InlineCode = styled('code')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
    padding: '2px 6px',
    borderRadius: 4,
    fontSize: '0.9em',
    fontFamily: "'SF Mono', 'Fira Code', monospace",
  };
});

const h1: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <Text variant="h3" as="h1">{children}</Text>
);

const h2: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>{children}</Text>
);

const h3: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <Text variant="h5" as="h3" style={{ marginTop: 32, marginBottom: 6 }}>{children}</Text>
);

const section: FunctionComponent<{ children?: ReactNode; id?: string }> = ({ children, id }) => (
  <StyledSection id={id}>{children}</StyledSection>
);

const p: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <Text variant="p" style={{ marginBottom: 12 }}>{children}</Text>
);

const CodeBlockWrapper = styled('div')(() => ({
  marginTop: 4,
  marginBottom: 16,
}));

const code: FunctionComponent<{ children?: string; className?: string }> = ({ children, className }) => {
  const language = className?.replace('language-', '');
  if (language) {
    return (
      <CodeBlockWrapper>
        <CodeBlock code={(children ?? '').replace(/\n$/, '')} language={language} />
      </CodeBlockWrapper>
    );
  }
  return <InlineCode>{children}</InlineCode>;
};

const pre: FunctionComponent<{ children?: ReactNode }> = ({ children }) => {
  // MDX wraps code blocks in <pre><code>. We handle rendering in the code component,
  // so pre just passes children through.
  return <>{children}</>;
};

const hr: FunctionComponent = () => <Divider spacing={28} />;

const a: FunctionComponent<{ children?: ReactNode; href?: string }> = ({ children, href }) => {
  if (href?.startsWith('/')) {
    return <Link to={href}>{children}</Link>;
  }
  return <a href={href}>{children}</a>;
};

export const mdxComponents = {
  h1,
  h2,
  h3,
  p,
  code,
  pre,
  hr,
  a,
  section,
};
