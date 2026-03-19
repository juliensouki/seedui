import { Children, FunctionComponent, isValidElement, MouseEvent, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { CodeBlock } from '../CodeBlock';
import { CheckIcon, LinkIcon } from 'lucide-react';

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

const HeadingRow = styled('div')(() => ({
  '&:hover .anchor-link': {
    opacity: 1,
  },
}));

const AnchorButton = styled('button')(({ theme }) => ({
  all: 'unset',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  color: theme.mode === 'light' ? theme.colors.neutral[900] : theme.colors.neutral.white,
  cursor: 'pointer',
  marginLeft: 8,
  verticalAlign: 'middle',
}));

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return getTextContent(node.props.children);
  }
  return '';
}

export const SectionHeading: FunctionComponent<{
  id?: string;
  children?: ReactNode;
  variant?: 'h3' | 'h4' | 'h5';
  as?: 'h1' | 'h2' | 'h3';
  style?: React.CSSProperties;
}> = ({ id, children, variant = 'h4', as = 'h2', style }) => {
  const [copied, setCopied] = useState(false);
  const anchorId = id || slugify(getTextContent(children));

  const handleCopy = (e: MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const iconSize = variant === 'h3' ? 16 : variant === 'h4' ? 14 : 12;

  return (
    <HeadingRow id={anchorId} style={style}>
      <Text variant={variant} as={as}>
        {children}
        <AnchorButton className="anchor-link" aria-label="Copy link to section" onClick={handleCopy} style={copied ? { opacity: 1 } : undefined}>
          {copied ? <CheckIcon size={iconSize} /> : <LinkIcon size={iconSize} />}
        </AnchorButton>
      </Text>
    </HeadingRow>
  );
};

const h1: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <SectionHeading variant="h3" as="h1">{children}</SectionHeading>
);

const h2: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <SectionHeading variant="h4" as="h2" style={{ marginBottom: 12 }}>{children}</SectionHeading>
);

const h3: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <SectionHeading variant="h5" as="h3" style={{ marginTop: 32, marginBottom: 6 }}>{children}</SectionHeading>
);

const section: FunctionComponent<{ children?: ReactNode; id?: string }> = ({ children, id }) => {
  // Pass the section id to the first heading child so the anchor link uses it
  const childArray = Children.toArray(children);
  const enhanced = childArray.map((child, i) => {
    if (i === 0 && isValidElement(child) && (child.type === h1 || child.type === h2 || child.type === h3)) {
      return { ...child, props: { ...child.props, id } } as React.ReactElement;
    }
    return child;
  });

  return <StyledSection id={id}>{enhanced}</StyledSection>;
};

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
