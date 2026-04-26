import { FunctionComponent, ReactNode } from 'react';
import { Text, Divider } from '@juliensouki/seedui';
import styled, { useTheme } from '@juliensouki/seedui/sc';
import { MDXProvider } from '@mdx-js/react';
import { TableOfContents } from '../layout/TableOfContents';
import { PageNavigation } from '../layout/PageNavigation';
import { EditThisPage } from '../layout/EditThisPage';
import { mdxComponents, SectionHeading } from './MDXComponents';

interface PageLayoutProps {
  title: string;
  description: string;
  currentPath?: string;
  headerActions?: ReactNode;
  children: ReactNode;
}

const Layout = styled.div(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

const MainContent = styled.div(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  '& section': {
    marginBottom: theme.spacing(5),
  },
}));

export const PageLayout: FunctionComponent<PageLayoutProps> = ({
  title,
  description,
  currentPath,
  headerActions,
  children,
}) => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  return (
    <Layout>
      <MainContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <SectionHeading variant="h3" as="h1">
              {title}
            </SectionHeading>
            <Text
              variant="p"
              style={{
                marginTop: theme.spacing(1),
                color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[900],
              }}
            >
              {description}
            </Text>
          </div>
          {headerActions && (
            <div style={{ display: 'flex', gap: theme.spacing(1), flexShrink: 0 }}>{headerActions}</div>
          )}
        </div>
        <Divider spacing={28} />
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        <EditThisPage currentPath={currentPath} />
        <PageNavigation currentPath={currentPath} />
      </MainContent>
      <TableOfContents path={currentPath} />
    </Layout>
  );
};
