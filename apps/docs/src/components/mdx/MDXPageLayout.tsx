import { FunctionComponent, ReactNode } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { MDXProvider } from '@mdx-js/react';
import { TableOfContents } from '../TableOfContents';
import { PageNavigation } from '../PageNavigation';
import { mdxComponents } from './MDXComponents';

interface TocItem {
  id: string;
  label: string;
}

interface MDXPageLayoutProps {
  title: string;
  description: string;
  toc: TocItem[];
  children: ReactNode;
}

const PageLayout = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

const MainContent = styled('div')(() => ({
  flex: 1,
  minWidth: 0,
  '& section': {
    marginBottom: 40,
  },
}));

export const MDXPageLayout: FunctionComponent<MDXPageLayoutProps> = ({ title, description, toc, children }) => {
  return (
    <PageLayout>
      <MainContent>
        <Text variant="h3" as="h1">{title}</Text>
        <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>{description}</Text>
        <Divider spacing={28} />
        <MDXProvider components={mdxComponents}>
          {children}
        </MDXProvider>
        <PageNavigation />
      </MainContent>
      <TableOfContents items={toc} />
    </PageLayout>
  );
};
