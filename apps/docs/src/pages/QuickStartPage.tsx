import { FunctionComponent } from 'react';
import { MDXPageLayout } from '../components/mdx/MDXPageLayout';
import QuickStartContent, { meta } from './content/quick-start.mdx';

export const QuickStartPage: FunctionComponent = () => {
  return (
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc}>
      <QuickStartContent />
    </MDXPageLayout>
  );
};
