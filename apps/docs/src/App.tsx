import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, styled, colors, Mode } from '@seedui-react/seedui';
import { componentDocs, categoryOrder } from './data/components';
import { gettingStartedPages, themeCategoryOrder, themePagesByCategory } from './data/navigation';
import { Topbar } from './components/Topbar';
import { ModeToggleContext } from './components/ModeContext';
import { MobileMenuContext } from './components/MobileMenuContext';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { ComponentPage } from './pages/ComponentPage';
import { InstallationPage } from './pages/InstallationPage';
import { QuickStartPage } from './pages/QuickStartPage';
import { ThemeProviderPage } from './pages/theming/ThemeProviderPage';
import { CustomizationPage } from './pages/theming/CustomizationPage';
import { ComponentStylesPage } from './pages/theming/ComponentStylesPage';
import { DefaultPropsPage } from './pages/theming/DefaultPropsPage';
import { DarkModePage } from './pages/theming/DarkModePage';
import { ColorsPage } from './pages/tokens/ColorsPage';
import { TypographyPage } from './pages/tokens/TypographyPage';
import { SpacingPage } from './pages/tokens/SpacingPage';
import { BorderRadiusPage } from './pages/tokens/BorderRadiusPage';
import { BoxShadowPage } from './pages/tokens/BoxShadowPage';
import { BreakpointsPage } from './pages/tokens/BreakpointsPage';


const Shell = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[900],
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[100],
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
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[800],
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

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<Mode>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const handleModeToggle = () => setMode(m => m === 'light' ? 'dark' : 'light');

  const mobileMenuValue = {
    isOpen: mobileMenuOpen,
    toggle: () => setMobileMenuOpen(prev => !prev),
    close: () => setMobileMenuOpen(false),
  };

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    contentRef.current?.scrollTo(0, 0);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: mode === 'light'
          ? colors.light.semantic.neutral[100]
          : colors.dark.semantic.neutral[900],
      }}
    >
      <ThemeProvider mode={mode}>
        <ModeToggleContext.Provider value={handleModeToggle}>
          <MobileMenuContext.Provider value={mobileMenuValue}>
            <Shell>
              <Topbar mode={mode} onModeToggle={handleModeToggle} />
              <Body>
                <Sidebar
                  gettingStartedPages={gettingStartedPages}
                  themeGroups={themeGroups}
                  componentGroups={componentGroups}
                />
                <Content ref={contentRef}>
                  <Inner>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/getting-started/installation" element={<InstallationPage />} />
                      <Route path="/getting-started/quick-start" element={<QuickStartPage />} />
                      <Route path="/theming/theme-provider" element={<ThemeProviderPage />} />
                      <Route path="/theming/customization" element={<CustomizationPage />} />
                      <Route path="/theming/dark-mode" element={<DarkModePage />} />
                      <Route path="/theming/component-styles" element={<ComponentStylesPage />} />
                      <Route path="/theming/default-props" element={<DefaultPropsPage />} />
                      <Route path="/tokens/colors" element={<ColorsPage />} />
                      <Route path="/tokens/typography" element={<TypographyPage />} />
                      <Route path="/tokens/spacing" element={<SpacingPage />} />
                      <Route path="/tokens/border-radius" element={<BorderRadiusPage />} />
                      <Route path="/tokens/box-shadow" element={<BoxShadowPage />} />
                      <Route path="/tokens/breakpoints" element={<BreakpointsPage />} />
                      <Route path="/components/:name" element={<ComponentPage />} />
                    </Routes>
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
