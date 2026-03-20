import { FunctionComponent } from 'react';
import { MDXPageLayout } from '../../components/mdx/MDXPageLayout';
import ThemeProviderContent, { meta } from '../content/theming/theme-provider.mdx';

export const ThemeProviderPage: FunctionComponent = () => {
  return (
    <MDXPageLayout title={meta.title} description={meta.description} toc={meta.toc}>
      <ThemeProviderContent />
    </MDXPageLayout>
  );
};
