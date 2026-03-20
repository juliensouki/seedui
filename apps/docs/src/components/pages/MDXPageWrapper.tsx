import { FunctionComponent, ReactNode } from 'react';
import { DocsShell } from '../DocsShell';
import { MDXPageLayout } from '../mdx/MDXPageLayout';

interface TocItem {
  id: string;
  label: string;
}

interface MDXPageWrapperProps {
  currentPath: string;
  title: string;
  description: string;
  toc: TocItem[];
  children: ReactNode;
}

export const MDXPageWrapper: FunctionComponent<MDXPageWrapperProps> = ({ currentPath, title, description, toc, children }) => (
  <DocsShell currentPath={currentPath}>
    <MDXPageLayout title={title} description={description} toc={toc} currentPath={currentPath}>
      {children}
    </MDXPageLayout>
  </DocsShell>
);
