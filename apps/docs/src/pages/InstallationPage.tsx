import { FunctionComponent } from 'react';
import { MDXPageLayout } from '../components/mdx/MDXPageLayout';
import InstallationContent, { meta } from './content/installation.mdx';

export const InstallationPage: FunctionComponent = () => {
  return (
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc}>
      <InstallationContent />
    </MDXPageLayout>
  );
};
