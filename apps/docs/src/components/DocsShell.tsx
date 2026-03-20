import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
import { ThemeProvider, styled, colors, Mode } from '@seedui-react/seedui';
import { componentDocs, categoryOrder } from '../data/components';
import { gettingStartedPages, themeCategoryOrder, themePagesByCategory } from '../data/navigation';
import { Topbar } from './Topbar';
import { ModeToggleContext } from './ModeContext';
import { MobileMenuContext } from './MobileMenuContext';
import { Sidebar } from './Sidebar';

const Shell = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[100],
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[900],
    fontFamily: "'Inter Variable', Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  };
});

const Body = styled('div')(() => ({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
}));

const Content = styled('main')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    flex: 1,
    overflow: 'auto',
    padding: 40,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[100],
    [theme.breakpoints.down('md')]: {
      padding: 20,
    },
  };
});

const Inner = styled('div')(() => ({
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
  const [mode, setMode] = useState<Mode>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleModeToggle = () => setMode(m => m === 'light' ? 'dark' : 'light');

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
      bar.classList.remove('loading');
      bar.classList.add('done');
      setTimeout(() => bar.classList.add('hide'), 200);
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
      <ThemeProvider mode={mode}>
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
