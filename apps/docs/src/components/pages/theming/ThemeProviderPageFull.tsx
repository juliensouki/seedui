import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { MDXPageLayout } from '../../mdx/MDXPageLayout';
import ThemeProviderContent, { meta } from '../../../content/theming/theme-provider.mdx';

export const ThemeProviderPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/theming/theme-provider">
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc} currentPath="/theming/theme-provider">
      <ThemeProviderContent />
    </MDXPageLayout>
  </DocsShell>
);
