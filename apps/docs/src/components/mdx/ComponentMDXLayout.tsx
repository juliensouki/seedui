import { FunctionComponent, ReactNode } from 'react';
import { Text, Divider, IconButton } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { FigmaIcon, GithubIcon } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';
import { TableOfContents } from '../TableOfContents';
import { PageNavigation } from '../PageNavigation';
import { mdxComponents, SectionHeading } from './MDXComponents';

interface ComponentMDXLayoutProps {
  name: string;
  description: string;
  currentPath?: string;
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

const tocItems = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-import', label: 'Import' },
  { id: 'section-usage', label: 'Usage' },
  { id: 'section-anatomy', label: 'Anatomy' },
  { id: 'section-props', label: 'Props' },
];

export const ComponentMDXLayout: FunctionComponent<ComponentMDXLayoutProps> = ({ name, description, currentPath, children }) => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  return (
    <PageLayout>
      <MainContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <SectionHeading variant="h3" as="h1">{name}</SectionHeading>
            <Text variant="p" style={{ marginTop: 8, color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800] }}>{description}</Text>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <IconButton variant="transparent" color="neutral" size="sm">
              <FigmaIcon size={16} strokeWidth={1.8} />
            </IconButton>
            <IconButton variant="transparent" color="neutral" size="sm">
              <GithubIcon size={16} strokeWidth={1.8} />
            </IconButton>
          </div>
        </div>
        <Divider spacing={28} />
        <MDXProvider components={mdxComponents}>
          {children}
        </MDXProvider>
        <PageNavigation currentPath={currentPath} />
      </MainContent>
      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
