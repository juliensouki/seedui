import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
import { ThemeProvider, colors, Mode, ThemeCustomization } from '@seedui-react/seedui';
import styled from '@seedui-react/seedui/sc';
import { componentDocs, categoryOrder } from '../../docs/components';
import { gettingStartedPages, themeCategoryOrder, themePagesByCategory } from './navigation';
import { Topbar } from './Topbar';
import { ModeToggleContext } from './ModeContext';
import { MobileMenuContext } from './MobileMenuContext';
import { Sidebar } from './Sidebar';

const bodyTextVariants = new Set(['p', 'caption', 'small']);

const docsTheme: ThemeCustomization = {
  components: {
    text: {
      conditionalStyles: [
        {
          condition: (props, theme) =>
            theme.mode === 'dark' && bodyTextVariants.has(props.variant ?? 'p'),
          styles: { color: colors.dark.semantic.neutral[900] },
        },
      ],
    },
  },
};

const Shell = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[100],
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[900],
    fontFamily: theme.typography.p.fontFamily,
  };
});

const Body = styled.div(() => ({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
}));

const Content = styled.main(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(5),
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[100],
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2.5),
    },
    '& code': {
      backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
      fontFamily: "'SF Mono', 'Fira Code', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace",
      fontSize: '0.9em',
      padding: `${theme.spacing(0.25)}px ${theme.spacing(0.75)}px`,
      borderRadius: theme.borderRadius(2),
    },
  };
});

const Inner = styled.div(() => ({
  maxWidth: 1100,
  margin: '0 auto',
}));

const themeGroups = themeCategoryOrder.map((category) => ({
  category,
  pages: themePagesByCategory[category],
}));

const componentGroups = categoryOrder.map((category) => ({
  category,
  names: componentDocs.filter((d) => d.category === category).map((d) => d.name),
})).filter((g) => g.names.length > 0);

interface DocsShellProps {
  currentPath: string;
  children: ReactNode;
}

export const DocsShell: FunctionComponent<DocsShellProps> = ({ currentPath, children }) => {
  const [mode, setMode] = useState<Mode>(() => {
    const stored = localStorage.getItem('seedui-docs-mode');
    return stored === 'dark' ? 'dark' : 'light';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleModeToggle = () => setMode(m => {
    const next = m === 'light' ? 'dark' : 'light';
    localStorage.setItem('seedui-docs-mode', next);
    return next;
  });

  const mobileMenuValue = {
    isOpen: mobileMenuOpen,
    toggle: () => setMobileMenuOpen(prev => !prev),
    close: () => setMobileMenuOpen(false),
  };

  // Close mobile menu on navigation and handle hash scrolling
  useEffect(() => {
    setMobileMenuOpen(false);
    const hash = window.location.hash.slice(1);
    if (!hash) {
      contentRef.current?.scrollTo(0, 0);
      return;
    }

    const scrollToEl = () => {
      const el = document.getElementById(hash);
      const container = contentRef.current;
      if (!el || !container) return false;
      const offset = el.getBoundingClientRect().top - container.getBoundingClientRect().top;
      container.scrollTop += offset - 16;
      return true;
    };

    if (scrollToEl()) return;

    const container = contentRef.current;
    if (!container) return;
    const observer = new MutationObserver(() => {
      if (scrollToEl()) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [currentPath]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Signal that the page is fully ready (all child useEffects have run)
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.style.visibility = 'visible';
    const bar = document.getElementById('page-progress');
    if (bar) {
      bar.style.width = '100%';
      bar.style.transition = 'width 0.15s ease';
      setTimeout(() => { bar.style.opacity = '0'; bar.style.transition = 'opacity 0.3s ease'; }, 200);
      setTimeout(() => bar.remove(), 600);
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        colorScheme: mode === 'dark' ? 'dark' : undefined,
        backgroundColor: mode === 'light'
          ? colors.light.semantic.neutral[100]
          : colors.dark.semantic.neutral[100],
      }}
    >
      <ThemeProvider mode={mode} theme={docsTheme}>
        <ModeToggleContext.Provider value={handleModeToggle}>
          <MobileMenuContext.Provider value={mobileMenuValue}>
            <Shell>
              <Topbar mode={mode} onModeToggle={handleModeToggle} />
              <Body>
                <Sidebar
                  currentPath={currentPath}
                  gettingStartedPages={gettingStartedPages}
                  themeGroups={themeGroups}
                  componentGroups={componentGroups}
                />
                <Content ref={contentRef}>
                  <Inner>
                    {children}
                  </Inner>
                </Content>
              </Body>
            </Shell>
          </MobileMenuContext.Provider>
        </ModeToggleContext.Provider>
      </ThemeProvider>
    </div>
  );
};
