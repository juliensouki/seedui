import { FunctionComponent } from 'react';
import { MDXPageLayout } from '../../components/mdx/MDXPageLayout';
import DarkModeContent, { meta } from '../content/theming/dark-mode.mdx';

export const DarkModePage: FunctionComponent = () => {
  return (
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc}>
      <DarkModeContent />
    </MDXPageLayout>
  );
};
