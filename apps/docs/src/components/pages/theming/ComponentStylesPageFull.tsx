import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { MDXPageLayout } from '../../mdx/MDXPageLayout';
import ComponentStylesContent, { meta } from '../../../content/theming/component-styles.mdx';

export const ComponentStylesPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/theming/component-styles">
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc} currentPath="/theming/component-styles">
      <ComponentStylesContent />
    </MDXPageLayout>
  </DocsShell>
);
