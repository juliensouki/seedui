import { FunctionComponent, useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { IconButton } from '@seedui-react/seedui';
import { FigmaIcon, GithubIcon } from 'lucide-react';
import { DocsShell } from './layout/DocsShell';
import { HomePage } from '../docs/home/HomePage';
import { PageLayout } from './mdx/PageLayout';
import { componentDocs } from '../docs/components';
import { Colors } from '../docs/theme/colors/colors';
import { Typography } from '../docs/theme/typography/typography';
import { Spacing } from '../docs/theme/spacing/spacing';
import { BorderRadius } from '../docs/theme/border-radius/border-radius';
import { BoxShadow } from '../docs/theme/box-shadow/box-shadow';
import { Breakpoints } from '../docs/theme/breakpoints/breakpoints';
import { ComponentWall } from '../docs/component-wall/ComponentWall';

// MDX content imports (compiled as React components via @mdx-js/rollup)
import InstallationContent, { meta as installationMeta } from '../docs/getting-started/installation/installation.mdx';
import QuickStartContent, { meta as quickStartMeta } from '../docs/getting-started/quick-start/quick-start.mdx';
import ContributeContent, { meta as contributeMeta } from '../docs/getting-started/contribute/contribute.mdx';
import ThemeProviderContent, { meta as themeProviderMeta } from '../docs/theme/theme-provider/theme-provider.mdx';
import CustomizationContent, { meta as customizationMeta } from '../docs/theme/customization/customization.mdx';
import DarkModeContent, { meta as darkModeMeta } from '../docs/theme/dark-mode/dark-mode.mdx';
import ComponentStylesContent, {
  meta as componentStylesMeta,
} from '../docs/theme/component-styles/component-styles.mdx';
import DefaultPropsContent, { meta as defaultPropsMeta } from '../docs/theme/default-props/default-props.mdx';

// Component MDX modules (eager load)
const componentMdxModules = import.meta.glob('../docs/components/**/*.mdx', { eager: true }) as Record<
  string,
  { default: FunctionComponent; meta?: any }
>;


const REPO_URL = 'https://github.com/juliensouki/seedui';

// Source paths relative to packages/seedui/src/components/
// Most components are `{Name}/{Name}.tsx`; a few are grouped under a shared parent folder.
const componentSourcePaths: Record<string, string> = {
  Button: 'Button/Button/Button.tsx',
  IconButton: 'Button/IconButton/IconButton.tsx',
};

const componentSourceUrl = (name: string) => {
  const relPath = componentSourcePaths[name] ?? `${name}/${name}.tsx`;
  return `${REPO_URL}/blob/main/packages/seedui/src/components/${relPath}`;
};

const componentHeaderActions = (name: string) => (
  <>
    <IconButton
      variant="transparent"
      color="neutral"
      size="md"
      onClick={() => window.open(componentSourceUrl(name), '_blank', 'noopener,noreferrer')}
      title="View source on GitHub"
    >
      <GithubIcon size={16} strokeWidth={1.8} />
    </IconButton>
    <IconButton variant="transparent" color="neutral" size="md">
      <FigmaIcon size={16} strokeWidth={1.8} />
    </IconButton>
  </>
);

interface DocsAppProps {
  initialPath: string;
}

function PageContent({ path }: { path: string }) {
  // Strip trailing slash for matching (except root)
  const p = path === '/' ? '/' : path.replace(/\/$/, '');

  // Home
  if (p === '/') return <HomePage />;

  // Component Wall
  if (p === '/component-wall') return <ComponentWall />;

  // Getting started
  if (p === '/getting-started/installation') {
    return (
      <PageLayout
        title={installationMeta.title}
        description={installationMeta.description}
        currentPath={p}
      >
        <InstallationContent />
      </PageLayout>
    );
  }
  if (p === '/getting-started/quick-start') {
    return (
      <PageLayout
        title={quickStartMeta.title}
        description={quickStartMeta.description}
        currentPath={p}
      >
        <QuickStartContent />
      </PageLayout>
    );
  }
  if (p === '/getting-started/contribute') {
    return (
      <PageLayout
        title={contributeMeta.title}
        description={contributeMeta.description}
        currentPath={p}
      >
        <ContributeContent />
      </PageLayout>
    );
  }

  // Theming
  const themingPages: Record<string, { Content: FunctionComponent; meta: any }> = {
    '/theming/theme-provider': { Content: ThemeProviderContent, meta: themeProviderMeta },
    '/theming/customization': { Content: CustomizationContent, meta: customizationMeta },
    '/theming/dark-mode': { Content: DarkModeContent, meta: darkModeMeta },
    '/theming/component-styles': { Content: ComponentStylesContent, meta: componentStylesMeta },
    '/theming/default-props': { Content: DefaultPropsContent, meta: defaultPropsMeta },
  };
  if (themingPages[p]) {
    const { Content, meta } = themingPages[p];
    return (
      <PageLayout title={meta.title} description={meta.description} currentPath={p}>
        <Content />
      </PageLayout>
    );
  }

  // Tokens
  const tokenPages: Record<string, FunctionComponent> = {
    '/tokens/colors': Colors,
    '/tokens/typography': Typography,
    '/tokens/spacing': Spacing,
    '/tokens/border-radius': BorderRadius,
    '/tokens/box-shadow': BoxShadow,
    '/tokens/breakpoints': Breakpoints,
  };
  if (tokenPages[p]) {
    const TokenPage = tokenPages[p];
    return <TokenPage />;
  }

  // Components
  if (p.startsWith('/components/')) {
    const name = p.replace('/components/', '');
    const doc = componentDocs.find((d) => d.name === name);
    if (doc) {
      const kebab = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const mdxKey = Object.keys(componentMdxModules).find((k) => k.includes(`/${kebab}.mdx`));
      const Content = mdxKey ? componentMdxModules[mdxKey].default : null;
      return (
        <PageLayout
          title={doc.name}
          description={doc.description}
          currentPath={p}
          headerActions={componentHeaderActions(doc.name)}
        >
          {Content ? <Content /> : <p>Not found.</p>}
        </PageLayout>
      );
    }
  }

  return <p>Page not found.</p>;
}

// Title map
const pageTitles: Record<string, string> = {
  '/': 'seedui | React Component Library',
  '/component-wall': 'seedui | Component Wall',
  '/getting-started/installation': 'seedui | Installation',
  '/getting-started/quick-start': 'seedui | Quick Start',
  '/getting-started/contribute': 'seedui | How to Contribute',
  '/theming/theme-provider': 'seedui | ThemeProvider',
  '/theming/customization': 'seedui | Customization',
  '/theming/dark-mode': 'seedui | Dark Mode',
  '/theming/component-styles': 'seedui | Component Styles',
  '/theming/default-props': 'seedui | Default Props',
  '/tokens/colors': 'seedui | Colors',
  '/tokens/typography': 'seedui | Typography',
  '/tokens/spacing': 'seedui | Spacing',
  '/tokens/border-radius': 'seedui | Border Radius',
  '/tokens/box-shadow': 'seedui | Box Shadow',
  '/tokens/breakpoints': 'seedui | Breakpoints',
};

function getTitle(path: string): string {
  const p = path === '/' ? '/' : path.replace(/\/$/, '');
  if (pageTitles[p]) return pageTitles[p];
  if (p.startsWith('/components/')) {
    const name = p.replace('/components/', '');
    return `seedui | ${name}`;
  }
  return 'seedui';
}

export const DocsApp: FunctionComponent<DocsAppProps> = ({ initialPath }) => {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : initialPath
  );

  const navigate = useCallback((newPath: string) => {
    const p = newPath === '/' ? '/' : newPath.replace(/\/$/, '');
    setCurrentPath(p);
    history.pushState(null, '', newPath);
    document.title = getTitle(p);
  }, []);

  // Intercept internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  // Handle back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      document.title = getTitle(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <DocsShell currentPath={currentPath}>
      <PageContent path={currentPath} />
    </DocsShell>
  );
};
