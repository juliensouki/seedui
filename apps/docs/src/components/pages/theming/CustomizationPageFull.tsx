import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { MDXPageLayout } from '../../mdx/MDXPageLayout';
import CustomizationContent, { meta } from '../../../content/theming/customization.mdx';

export const CustomizationPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/theming/customization">
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc} currentPath="/theming/customization">
      <CustomizationContent />
    </MDXPageLayout>
  </DocsShell>
);
