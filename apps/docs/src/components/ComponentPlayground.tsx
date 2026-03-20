import {
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useContext,
} from 'react';
import { LiveProvider, LivePreview, LiveContext } from 'react-live';
import { themes } from 'prism-react-renderer';
import SimpleEditor from 'react-simple-code-editor';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import tsx from 'shiki/langs/tsx.mjs';
import darkPlus from 'shiki/themes/dark-plus.mjs';
import {
  styled,
  useTheme,
  Avatar,
  AvatarStack,
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Popover,
  SearchBar,
  Select,
  Skeleton,
  Stepper,
  Tag,
  TagSelector,
  Text,
  Textarea,
  Toggle,
  Tooltip,
  IconButton,
  ProgressBar,
} from '@seedui-react/seedui';
import {
  CopyIcon,
  CheckIcon,
  GemIcon,
  CreditCardIcon,
  BuildingIcon,
  WalletIcon,
  SmartphoneIcon,
  LandmarkIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  CloudRainIcon,
  CloudSnowIcon,
  WindIcon,
  PencilIcon,
  SettingsIcon,
  SearchIcon,
  TrashIcon,
  ShareIcon,
} from 'lucide-react';

const liveScope = {
  useState,
  useCallback,
  useMemo,
  styled,
  useTheme,
  Avatar,
  AvatarStack,
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Popover,
  ProgressBar,
  SearchBar,
  Select,
  Skeleton,
  Stepper,
  Tag,
  TagSelector,
  Text,
  Textarea,
  Toggle,
  Tooltip,
  IconButton,
  GemIcon,
  CreditCardIcon,
  BuildingIcon,
  WalletIcon,
  SmartphoneIcon,
  LandmarkIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  CloudRainIcon,
  CloudSnowIcon,
  WindIcon,
  PencilIcon,
  SettingsIcon,
  SearchIcon,
  TrashIcon,
  ShareIcon,
};

const highlighter = createHighlighterCoreSync({
  themes: [darkPlus],
  langs: [tsx],
  engine: createJavaScriptRegexEngine(),
});

function highlightCode(code: string): string {
  const html = highlighter.codeToHtml(code, { lang: 'tsx', theme: 'dark-plus' });
  return html
    .replace(/^<pre[^>]*><code[^>]*>/, '')
    .replace(/<\/code><\/pre>$/, '');
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

// Keeps showing the last successfully rendered preview when LivePreview goes blank (error).
// Works by snapshotting innerHTML when LivePreview has real content, and showing
// the frozen snapshot via dangerouslySetInnerHTML when it goes empty.
function StablePreview() {
  const { error, element } = useContext(LiveContext);
  const liveRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef('');
  const hasError = !!error || !element;

  useLayoutEffect(() => {
    if (liveRef.current) {
      // LivePreview renders a wrapper div. Check if it has actual content inside.
      const wrapper = liveRef.current.firstElementChild;
      if (wrapper && wrapper.childElementCount > 0) {
        snapshotRef.current = liveRef.current.innerHTML;
      }
    }
  });

  return (
    <>
      <div
        ref={liveRef}
        style={hasError && snapshotRef.current ? { display: 'none' } : undefined}
      >
        <LivePreview />
      </div>
      {hasError && snapshotRef.current && (
        <div dangerouslySetInnerHTML={{ __html: snapshotRef.current }} />
      )}
    </>
  );
}

const Wrapper = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    overflow: 'hidden' as const,
  };
});

const PreviewPane = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: 24,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    minHeight: 60,
  };
});

const CodePane = styled('div')(({ theme }) => ({
  position: 'relative',
  borderTop: `1px solid ${theme.mode === 'light' ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
  backgroundColor: theme.mode === 'light' ? theme.colors.neutral[900] : theme.colors.neutral[200],

  '& .code-editor': {
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace !important",
    fontSize: '13px !important',
    lineHeight: '1.6 !important',
  },

  '& .code-editor > textarea, & .code-editor > pre': {
    padding: '16px 48px 16px 16px !important',
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace !important",
    fontSize: '13px !important',
    lineHeight: '1.6 !important',
    background: 'transparent !important',
    outline: 'none',
  },
}));

const CopyButton = styled('button')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    transition: 'color 0.15s, background-color 0.15s',
    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
      color: isLight ? theme.colors.neutral[200] : theme.colors.neutral[800],
    },
  };
});

const ErrorBar = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '12px 16px',
    backgroundColor: isLight ? theme.colors.error[100] : '#2d1215',
    color: isLight ? theme.colors.error[700] : '#f87171',
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
    fontSize: 12,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap' as const,
  };
});

// Only show errors when the preview snapshot is also gone (i.e. never had a valid render)
function LiveErrorBar() {
  const { error } = useContext(LiveContext);
  const snapshotExists = useRef(false);

  // Once a valid render has happened, StablePreview holds a snapshot — suppress transient errors
  if (!error) snapshotExists.current = true;
  if (snapshotExists.current) return null;

  return <ErrorBar>{error}</ErrorBar>;
}

interface ComponentPlaygroundProps {
  code: string;
}

export const ComponentPlayground: FunctionComponent<ComponentPlaygroundProps> = ({ code }) => {
  const initialPrepared = useMemo(() => prepareCode(code), [code]);

  // The code fed to LiveProvider — only updated when new code compiles
  const [liveCode, setLiveCode] = useState(initialPrepared.code);
  const [noInline, setNoInline] = useState(initialPrepared.noInline);
  const [copied, setCopied] = useState(false);
  const editorCodeRef = useRef(code);
  const [editorCode, setEditorCode] = useState(code);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Sync state when the code prop changes (e.g. navigating between components)
  useEffect(() => {
    const prepared = prepareCode(code);
    setLiveCode(prepared.code);
    setNoInline(prepared.noInline);
    editorCodeRef.current = code;
    setEditorCode(code);
  }, [code]);

  const handleCodeChange = useCallback((newCode: string) => {
    editorCodeRef.current = newCode;
    setEditorCode(newCode);
    const prepared = prepareCode(newCode);
    setLiveCode(prepared.code);
    setNoInline(prepared.noInline);
  }, []);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(editorCodeRef.current);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  if (!mounted) {
    // SSR: show code text with reserved preview space to prevent layout shift
    return (
      <Wrapper>
        <PreviewPane />
        <CodePane>
          <pre className="code-editor" style={{ padding: '16px 48px 16px 16px', backgroundColor: 'transparent', color: '#D4D4D4', fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace", fontSize: 13, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
            <code>{code}</code>
          </pre>
        </CodePane>
      </Wrapper>
    );
  }

  return (
    <LiveProvider code={liveCode} scope={liveScope} noInline={noInline} theme={themes.vsDark}>
      <Wrapper>
        <PreviewPane>
          <StablePreview />
        </PreviewPane>
        <CodePane>
          <CopyButton onClick={handleCopy} title="Copy code">
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
