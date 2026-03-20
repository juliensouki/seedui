import { FunctionComponent } from 'react';
import { MDXPageLayout } from '../../components/mdx/MDXPageLayout';
import CustomizationContent, { meta } from '../content/theming/customization.mdx';

export const CustomizationPage: FunctionComponent = () => {
  return (
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc}>
      <CustomizationContent />
    </MDXPageLayout>
  );
};
