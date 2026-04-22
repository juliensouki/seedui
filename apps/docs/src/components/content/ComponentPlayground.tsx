import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useContext,
} from 'react';
import { LiveProvider, LivePreview, LiveContext } from 'react-live';
import { themes, Highlight } from 'prism-react-renderer';
import SimpleEditor from 'react-simple-code-editor';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import tsx from 'shiki/langs/tsx.mjs';
import darkPlus from 'shiki/themes/dark-plus.mjs';
import * as seedui from '@seedui-react/seedui';
import { IconButton } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { CopyIcon, CheckIcon } from 'lucide-react';

const baseScope = {
  useState,
  useCallback,
  useMemo,
  styled,
  useTheme,
  ...seedui,
};

const highlighter = createHighlighterCoreSync({
  themes: [darkPlus],
  langs: [tsx],
  engine: createJavaScriptRegexEngine(),
});

function highlightCode(code: string): string {
  const html = highlighter.codeToHtml(code, { lang: 'tsx', theme: 'dark-plus' });
  return html.replace(/^<pre[^>]*><code[^>]*>/, '').replace(/<\/code><\/pre>$/, '');
}

interface LayoutWrapper {
  open: string;
  close: string;
  baseIndent: string;
}

function stripLayoutWrapper(code: string): { wrapper: LayoutWrapper | null; inner: string } {
  const trimmed = code.trim();
  if (!trimmed.startsWith('<div')) return { wrapper: null, inner: code };

  let openEnd = -1;
  let braceDepth = 0;
  for (let i = 0; i < trimmed.length; i++) {
    const c = trimmed[i];
    if (c === '{') braceDepth++;
    else if (c === '}') braceDepth--;
    else if (c === '>' && braceDepth === 0) {
      openEnd = i;
      break;
    }
  }
  if (openEnd === -1) return { wrapper: null, inner: code };

  const open = trimmed.slice(0, openEnd + 1);
  const isPlainDiv = open === '<div>';
  const hasStyle = /\sstyle\s*=\s*\{\{/.test(open);
  if (!isPlainDiv && !hasStyle) return { wrapper: null, inner: code };
  if (!trimmed.endsWith('</div>')) return { wrapper: null, inner: code };

  const innerRaw = trimmed.slice(openEnd + 1, trimmed.length - '</div>'.length);
  const openDivs = (innerRaw.match(/<div[\s>/]/g) || []).length;
  const closeDivs = (innerRaw.match(/<\/div>/g) || []).length;
  if (openDivs !== closeDivs) return { wrapper: null, inner: code };

  const lines = innerRaw.split('\n');
  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

  const indents = lines.filter((l) => l.trim() !== '').map((l) => l.match(/^ */)?.[0].length ?? 0);
  const minIndent = indents.length ? Math.min(...indents) : 0;
  const dedented = lines.map((l) => l.slice(minIndent)).join('\n');

  return {
    wrapper: { open, close: '</div>', baseIndent: ' '.repeat(minIndent || 2) },
    inner: dedented,
  };
}

function rewrapLayout(inner: string, wrapper: LayoutWrapper): string {
  const lines = inner.split('\n').map((l) => (l.length ? wrapper.baseIndent + l : l));
  return `${wrapper.open}\n${lines.join('\n')}\n${wrapper.close}`;
}

function prepareCode(code: string): { code: string; noInline: boolean } {
  const hasHooks = /\buse[A-Z]\w*\s*\(/.test(code);

  if (!hasHooks) {
    return { code: code.trim(), noInline: false };
  }

  const lines = code.split('\n');
  const firstJsxIdx = lines.findIndex((l) => l.trim().startsWith('<'));

  if (firstJsxIdx === -1) {
    return { code: code.trim(), noInline: false };
  }

  const statements = lines.slice(0, firstJsxIdx).filter((l) => l.trim());
  const jsx = lines.slice(firstJsxIdx);
  const jsxStr = jsx.join('\n    ');

  const wrapped = `function Demo() {
  ${statements.join('\n  ')}
  return (
    <>${jsxStr}</>
  );
}

render(<Demo />)`;

  return { code: wrapped, noInline: true };
}

function StablePreview() {
  const { error, element } = useContext(LiveContext);
  const liveRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef('');
  const hasError = !!error || !element;

  useLayoutEffect(() => {
    if (liveRef.current) {
      const wrapper = liveRef.current.firstElementChild;
      if (wrapper && wrapper.childElementCount > 0) {
        snapshotRef.current = liveRef.current.innerHTML;
      }
    }
  });

  return (
    <>
      <div ref={liveRef} style={hasError && snapshotRef.current ? { display: 'none' } : undefined}>
        <LivePreview />
      </div>
      {hasError && snapshotRef.current && <div dangerouslySetInnerHTML={{ __html: snapshotRef.current }} />}
    </>
  );
}

const Wrapper = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: theme.borderRadius(4),
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    marginBottom: theme.spacing(3),
  };
});

const PreviewPane = styled.div<{ $standalone?: boolean }>(({ theme, $standalone }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: theme.spacing(3),
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[100],
    borderRadius: $standalone
      ? theme.borderRadius(4)
      : `${theme.borderRadius(4)}px ${theme.borderRadius(4)}px 0 0`,
    overflow: 'visible',
  };
});

const CodePane = styled.div<{ $hasPreview?: boolean }>(({ theme, $hasPreview }) => ({
  position: 'relative',
  borderTop: $hasPreview
    ? `1px solid ${theme.mode === 'light' ? theme.colors.neutral[200] : theme.colors.neutral[300]}`
    : undefined,
  backgroundColor: theme.mode === 'light' ? theme.colors.neutral[900] : theme.colors.neutral[200],
  borderRadius: $hasPreview
    ? `0 0 ${theme.borderRadius(4)}px ${theme.borderRadius(4)}px`
    : theme.borderRadius(4),
  overflow: 'hidden',

  '& .code-editor': {
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace !important",
    fontSize: '13px !important',
    lineHeight: '1.6 !important',
  },

  '& .code-editor > textarea, & .code-editor > pre': {
    padding: `${theme.spacing(2)}px ${theme.spacing(6)}px ${theme.spacing(2)}px ${theme.spacing(2)}px !important`,
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace !important",
    fontSize: '13px !important',
    lineHeight: '1.6 !important',
    background: 'transparent !important',
    outline: 'none',
  },
}));

const ReadOnlyCode = styled.pre(({ theme }) => ({
  padding: `${theme.spacing(2)}px ${theme.spacing(6)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  fontSize: theme.typography.caption.fontSize,
  lineHeight: 1.6,
  fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
  overflowX: 'auto',
  margin: 0,
  background: 'transparent',
}));

const CopyButton = styled(IconButton)<{ $centered?: boolean }>(({ theme, $centered }) => ({
  position: 'absolute',
  top: $centered ? '50%' : theme.spacing(1),
  transform: $centered ? 'translateY(-50%)' : undefined,
  right: theme.spacing(1),
  zIndex: 2,
  backgroundColor: 'transparent',
  color: theme.colors.neutral.white,
  '& svg': {
    color: theme.colors.neutral.white,
    width: 14,
    height: 14,
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&:focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    outline: '2px solid rgba(255, 255, 255, 0.25)',
    outlineOffset: 1,
  },
  '&:active': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    outline: '2px solid rgba(255, 255, 255, 0.3)',
    outlineOffset: 1,
    ...($centered && { transform: 'translateY(-50%) scale(0.95)' }),
  },
  '&:hover svg, &:focus svg, &:active svg': {
    color: theme.colors.neutral.white,
  },
}));

const ErrorBar = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    backgroundColor: isLight ? theme.colors.error[100] : theme.colors.error[200],
    color: isLight ? theme.colors.error[700] : theme.colors.error[700],
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
    fontSize: theme.typography.caption.fontSize,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap' as const,
  };
});

function LiveErrorBar() {
  const { error } = useContext(LiveContext);
  const snapshotExists = useRef(false);

  if (!error) snapshotExists.current = true;
  if (snapshotExists.current) return null;

  return <ErrorBar>{error}</ErrorBar>;
}

interface ComponentPlaygroundProps {
  /** Code string to display. Omit for preview-only mode. */
  code?: string;
  /** Static preview content (bypasses react-live). */
  preview?: ReactNode;
  /** Background for the preview pane. */
  previewBg?: 'contrast' | string;
  /** Additional scope variables for react-live. */
  scope?: Record<string, unknown>;
  /** When true, shows code as read-only with syntax highlighting (no live editing). */
  readOnly?: boolean;
  /** Language for read-only syntax highlighting. */
  language?: string;
}

export const ComponentPlayground: FunctionComponent<ComponentPlaygroundProps> = ({
  code,
  preview,
  previewBg: previewBgProp,
  scope,
  readOnly,
  language = 'tsx',
}) => {
  const theme = useTheme();
  const previewBg =
    previewBgProp === 'contrast'
      ? theme.mode === 'light'
        ? theme.colors.neutral.white
        : theme.colors.neutral[100]
      : previewBgProp;

  const displayCode = useMemo(() => (code ? stripLayoutWrapper(code).inner : ''), [code]);

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (displayCode) {
      void navigator.clipboard.writeText(displayCode.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [displayCode]);

  // Preview-only mode (no code)
  if (!code) {
    return (
      <Wrapper>
        <PreviewPane $standalone style={previewBg ? { backgroundColor: previewBg } : undefined}>{preview}</PreviewPane>
      </Wrapper>
    );
  }

  // Read-only code block mode
  if (readOnly) {
    const isSingleLine = displayCode.trim().split('\n').length === 1;
    return (
      <Wrapper>
        <CodePane>
          <CopyButton $centered={isSingleLine} variant="transparent" color="neutral" size="sm" onClick={handleCopy} title="Copy code">
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          </CopyButton>
          <Highlight theme={themes.vsDark} code={displayCode.trim()} language={language}>
            {({ tokens, getLineProps, getTokenProps }) => (
              <ReadOnlyCode>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, j) => (
                      <span key={j} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </ReadOnlyCode>
            )}
          </Highlight>
        </CodePane>
      </Wrapper>
    );
  }

  // Live playground mode
  return <LivePlayground code={code} preview={preview} previewBg={previewBg} scope={scope} />;
};

// Separated to avoid hooks running in read-only/preview-only paths
const LivePlayground: FunctionComponent<{
  code: string;
  preview?: ReactNode;
  previewBg?: string;
  scope?: Record<string, unknown>;
}> = ({ code, preview, previewBg, scope }) => {
  const theme = useTheme();
  const initial = useMemo(() => {
    const { wrapper, inner } = stripLayoutWrapper(code);
    const prepared = prepareCode(code);
    return { wrapper, display: inner, prepared };
  }, [code]);

  const wrapperRef = useRef<LayoutWrapper | null>(initial.wrapper);
  const [liveCode, setLiveCode] = useState(initial.prepared.code);
  const [noInline, setNoInline] = useState(initial.prepared.noInline);
  const [copied, setCopied] = useState(false);
  const editorCodeRef = useRef(initial.display);
  const [editorCode, setEditorCode] = useState(initial.display);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const { wrapper, inner } = stripLayoutWrapper(code);
    wrapperRef.current = wrapper;
    const prepared = prepareCode(code);
    setLiveCode(prepared.code);
    setNoInline(prepared.noInline);
    editorCodeRef.current = inner;
    setEditorCode(inner);
  }, [code]);

  const handleCodeChange = useCallback((newDisplayCode: string) => {
    editorCodeRef.current = newDisplayCode;
    setEditorCode(newDisplayCode);
    const full = wrapperRef.current ? rewrapLayout(newDisplayCode, wrapperRef.current) : newDisplayCode;
    const prepared = prepareCode(full);
    setLiveCode(prepared.code);
    setNoInline(prepared.noInline);
  }, []);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(editorCodeRef.current);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const hasPreview = !!preview || !preview; // always show preview pane for live mode

  if (!mounted) {
    return (
      <Wrapper>
        <PreviewPane style={previewBg ? { backgroundColor: previewBg } : undefined}>{preview}</PreviewPane>
        <CodePane $hasPreview>
          <pre
            className="code-editor"
            style={{
              padding: `${theme.spacing(2)}px ${theme.spacing(6)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
              backgroundColor: 'transparent',
              color: '#D4D4D4',
              fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
              fontSize: 13,
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            <code>{editorCode}</code>
          </pre>
        </CodePane>
      </Wrapper>
    );
  }

  if (preview) {
    return (
      <Wrapper>
        <PreviewPane style={previewBg ? { backgroundColor: previewBg } : undefined}>{preview}</PreviewPane>
        <CodePane $hasPreview>
          <CopyButton variant="transparent" color="neutral" size="sm" onClick={handleCopy} title="Copy code">
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          </CopyButton>
          <SimpleEditor
            className="code-editor"
            value={editorCode}
            onValueChange={handleCodeChange}
            highlight={highlightCode}
            style={{ backgroundColor: 'transparent', color: '#D4D4D4' }}
          />
        </CodePane>
      </Wrapper>
    );
  }

  return (
    <LiveProvider
      code={liveCode}
      scope={scope ? { ...baseScope, ...scope } : baseScope}
      noInline={noInline}
      theme={themes.vsDark}
    >
      <Wrapper>
        <PreviewPane style={previewBg ? { backgroundColor: previewBg } : undefined}>
          <StablePreview />
        </PreviewPane>
        <CodePane $hasPreview>
          <CopyButton variant="transparent" color="neutral" size="sm" onClick={handleCopy} title="Copy code">
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          </CopyButton>
          <SimpleEditor
            className="code-editor"
            value={editorCode}
            onValueChange={handleCodeChange}
            highlight={highlightCode}
            style={{ backgroundColor: 'transparent', color: '#D4D4D4' }}
          />
        </CodePane>
        <LiveErrorBar />
      </Wrapper>
    </LiveProvider>
  );
};
