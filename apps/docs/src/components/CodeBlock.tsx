import { FunctionComponent, useCallback, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { styled } from '@seedui-react/seedui';
import { CopyIcon, CheckIcon } from 'lucide-react';

const Wrapper = styled('div')(() => ({
  position: 'relative',
}));

const Pre = styled('pre')(({ theme }) => ({
  backgroundColor: theme.colors.neutral[900],
  padding: '20px 48px 20px 20px',
  borderRadius: 8,
  fontSize: 13,
  lineHeight: 1.6,
  fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
  overflowX: 'auto',
  margin: 0,
}));

const CopyButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: 14,
  right: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: theme.colors.neutral[400],
  transition: 'color 0.15s, background-color 0.15s',
  '&:hover': {
    backgroundColor: theme.colors.neutral[800],
    color: theme.colors.neutral[200],
  },
}));

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: FunctionComponent<CodeBlockProps> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <Wrapper>
          <CopyButton onClick={handleCopy} title="Copy code">
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          </CopyButton>
          <Pre>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, j) => (
                  <span key={j} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </Pre>
        </Wrapper>
      )}
    </Highlight>
  );
};
