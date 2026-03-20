import { FunctionComponent } from 'react';
import { DocsShell } from '../DocsShell';
import { MDXPageLayout } from '../mdx/MDXPageLayout';
import InstallationContent, { meta } from '../../content/installation.mdx';

export const InstallationPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/getting-started/installation">
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc} currentPath="/getting-started/installation">
      <InstallationContent />
    </MDXPageLayout>
  </DocsShell>
);
