import { FunctionComponent, ReactNode } from 'react';
import { Text, Divider } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { MDXProvider } from '@mdx-js/react';
import { TableOfContents } from '../layout/TableOfContents';
import { PageNavigation } from '../layout/PageNavigation';
import { mdxComponents, SectionHeading } from './MDXComponents';

interface TocItem {
  id: string;
  label: string;
}

interface MDXPageLayoutProps {
  title: string;
  description: string;
  toc: TocItem[];
  currentPath?: string;
  children: ReactNode;
}

const PageLayout = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

const MainContent = styled('div')(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  '& section': {
    marginBottom: theme.spacing(5),
  },
}));

export const MDXPageLayout: FunctionComponent<MDXPageLayoutProps> = ({ title, description, toc, currentPath, children }) => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  return (
    <PageLayout>
      <MainContent>
        <SectionHeading variant="h3" as="h1">{title}</SectionHeading>
        <Text variant="p" style={{ marginTop: theme.spacing(1), color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800] }}>{description}</Text>
        <Divider spacing={28} />
        <MDXProvider components={mdxComponents}>
          {children}
        </MDXProvider>
        <PageNavigation currentPath={currentPath} />
      </MainContent>
      <TableOfContents items={toc} />
    </PageLayout>
  );
};
