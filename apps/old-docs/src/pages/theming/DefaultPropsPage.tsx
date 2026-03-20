import { FunctionComponent } from 'react';
import { MDXPageLayout } from '../../components/mdx/MDXPageLayout';
import DefaultPropsContent, { meta } from '../content/theming/default-props.mdx';

export const DefaultPropsPage: FunctionComponent = () => {
  return (
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc}>
      <DefaultPropsContent />
    </MDXPageLayout>
  );
};
