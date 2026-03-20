import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { MDXPageLayout } from '../../mdx/MDXPageLayout';
import DefaultPropsContent, { meta } from '../../../content/theming/default-props.mdx';

export const DefaultPropsPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/theming/default-props">
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc} currentPath="/theming/default-props">
      <DefaultPropsContent />
    </MDXPageLayout>
  </DocsShell>
);
