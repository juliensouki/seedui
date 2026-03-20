import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { MDXPageLayout } from '../../mdx/MDXPageLayout';
import DarkModeContent, { meta } from '../../../content/theming/dark-mode.mdx';

export const DarkModePageFull: FunctionComponent = () => (
  <DocsShell currentPath="/theming/dark-mode">
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc} currentPath="/theming/dark-mode">
      <DarkModeContent />
    </MDXPageLayout>
  </DocsShell>
);
