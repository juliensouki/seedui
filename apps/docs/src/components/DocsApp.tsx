import { FunctionComponent, ReactNode, useCallback, useEffect, useState } from 'react';
import { IconButton } from '@seedui-react/seedui';
import { FigmaIcon, GithubIcon } from 'lucide-react';
import { DocsShell } from './layout/DocsShell';
import { HomePage } from '../docs/home/HomePage';
import { PageLayout } from './mdx/PageLayout';
import { componentDocs } from '../docs/components';
import { BASE_GITHUB_URL } from '../constants';
import { Colors } from '../docs/theme/colors/colors';
import { Typography } from '../docs/theme/typography/typography';
import { Spacing } from '../docs/theme/spacing/spacing';
import { BorderRadius } from '../docs/theme/border-radius/border-radius';
import { BoxShadow } from '../docs/theme/box-shadow/box-shadow';
import { Breakpoints } from '../docs/theme/breakpoints/breakpoints';

import InstallationContent, { meta as installationMeta } from '../docs/getting-started/installation/installation.mdx';
import QuickStartContent, { meta as quickStartMeta } from '../docs/getting-started/quick-start/quick-start.mdx';
import ContributeContent, { meta as contributeMeta } from '../docs/getting-started/contribute/contribute.mdx';
import ThemeProviderContent, { meta as themeProviderMeta } from '../docs/theme/theme-provider/theme-provider.mdx';
import CustomizationContent, { meta as customizationMeta } from '../docs/theme/customization/customization.mdx';
import DarkModeContent, { meta as darkModeMeta } from '../docs/theme/dark-mode/dark-mode.mdx';
import ComponentStylesContent, { meta as componentStylesMeta } from '../docs/theme/component-styles/component-styles.mdx';
import DefaultPropsContent, { meta as defaultPropsMeta } from '../docs/theme/default-props/default-props.mdx';

const componentMdxModules = import.meta.glob('../docs/components/**/*.mdx', { eager: true }) as Record<
  string,
  { default: FunctionComponent; meta?: { title: string; description?: string } }
>;

interface PageMeta {
  title: string;
  description: string;
}

interface PageEntry {
  path: string;
  title: string;
  render: () => ReactNode;
}

const componentSourcePaths: Record<string, string> = {
  Button: 'Button/Button/Button.tsx',
  IconButton: 'Button/IconButton/IconButton.tsx',
};

const componentSourceUrl = (name: string) => {
  const relPath = componentSourcePaths[name] ?? `${name}/${name}.tsx`;
  return `${BASE_GITHUB_URL}/blob/main/packages/seedui/src/components/${relPath}`;
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

const mdxPage = (path: string, Content: FunctionComponent, meta: PageMeta): PageEntry => ({
  path,
  title: `seedui | ${meta.title}`,
  render: () => (
    <PageLayout title={meta.title} description={meta.description} currentPath={path}>
      <Content />
    </PageLayout>
  ),
});

const rawPage = (path: string, title: string, Component: FunctionComponent): PageEntry => ({
  path,
  title: `seedui | ${title}`,
  render: () => <Component />,
});

const pages: PageEntry[] = [
  { path: '/', title: 'seedui | React Component Library', render: () => <HomePage /> },

  mdxPage('/getting-started/installation', InstallationContent, installationMeta),
  mdxPage('/getting-started/quick-start', QuickStartContent, quickStartMeta),
  mdxPage('/getting-started/contribute', ContributeContent, contributeMeta),

  mdxPage('/theming/theme-provider', ThemeProviderContent, themeProviderMeta),
  mdxPage('/theming/customization', CustomizationContent, customizationMeta),
  mdxPage('/theming/dark-mode', DarkModeContent, darkModeMeta),
  mdxPage('/theming/component-styles', ComponentStylesContent, componentStylesMeta),
  mdxPage('/theming/default-props', DefaultPropsContent, defaultPropsMeta),

  rawPage('/tokens/colors', 'Colors', Colors),
  rawPage('/tokens/typography', 'Typography', Typography),
  rawPage('/tokens/spacing', 'Spacing', Spacing),
  rawPage('/tokens/border-radius', 'Border Radius', BorderRadius),
  rawPage('/tokens/box-shadow', 'Box Shadow', BoxShadow),
  rawPage('/tokens/breakpoints', 'Breakpoints', Breakpoints),
];

const pageMap = new Map(pages.map((p) => [p.path, p]));

const renderComponentPage = (name: string): ReactNode | null => {
  const doc = componentDocs.find((d) => d.name === name);
  if (!doc) return null;
  const kebab = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const mdxKey = Object.keys(componentMdxModules).find((k) => k.includes(`/${kebab}.mdx`));
  const Content = mdxKey ? componentMdxModules[mdxKey].default : null;
  return (
    <PageLayout
      title={doc.name}
      description={doc.description}
      currentPath={`/components/${name}`}
      headerActions={componentHeaderActions(doc.name)}
    >
      {Content ? <Content /> : <p>Not found.</p>}
    </PageLayout>
  );
};

const normalizePath = (path: string) => (path === '/' ? '/' : path.replace(/\/$/, ''));

const resolve = (path: string): { title: string; node: ReactNode } => {
  const p = normalizePath(path);
  const entry = pageMap.get(p);
  if (entry) return { title: entry.title, node: entry.render() };

  if (p.startsWith('/components/')) {
    const name = p.replace('/components/', '');
    const node = renderComponentPage(name);
    if (node) return { title: `seedui | ${name}`, node };
  }

  return { title: 'seedui', node: <p>Page not found.</p> };
};

interface DocsAppProps {
  initialPath: string;
}

export const DocsApp: FunctionComponent<DocsAppProps> = ({ initialPath }) => {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : initialPath,
  );

  const { title, node } = resolve(currentPath);

  const navigate = useCallback((newPath: string) => {
    setCurrentPath(normalizePath(newPath));
    history.pushState(null, '', newPath);
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

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

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <DocsShell currentPath={currentPath}>
      {node}
    </DocsShell>
  );
};
