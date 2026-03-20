import { FunctionComponent } from 'react';
import { DocsShell } from '../DocsShell';
import { MDXPageLayout } from '../mdx/MDXPageLayout';
import QuickStartContent, { meta } from '../../content/quick-start.mdx';

export const QuickStartPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/getting-started/quick-start">
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc} currentPath="/getting-started/quick-start">
      <QuickStartContent />
    </MDXPageLayout>
  </DocsShell>
);
