import { FunctionComponent } from 'react';
import { MDXPageLayout } from '../../components/mdx/MDXPageLayout';
import ComponentStylesContent, { meta } from '../content/theming/component-styles.mdx';

export const ComponentStylesPage: FunctionComponent = () => {
  return (
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc}>
      <ComponentStylesContent />
    </MDXPageLayout>
  );
};
