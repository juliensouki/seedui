import { FunctionComponent, lazy, Suspense } from 'react';
import { DocsShell } from '../DocsShell';
import { ComponentMDXLayout } from '../mdx/ComponentMDXLayout';

interface ComponentPageProps {
  name: string;
  description: string;
  currentPath: string;
  mdxKey: string;
}

// Eagerly load all component MDX modules
const mdxModules = import.meta.glob('../../content/components/*.mdx', { eager: true }) as Record<string, { default: FunctionComponent }>;

export const ComponentPageFull: FunctionComponent<ComponentPageProps> = ({ name, description, currentPath, mdxKey }) => {
  const mdxModule = mdxModules[mdxKey];
  const Content = mdxModule?.default;

  return (
    <DocsShell currentPath={currentPath}>
      <ComponentMDXLayout name={name} description={description} currentPath={currentPath}>
        {Content ? <Content /> : <p>Component documentation not found.</p>}
      </ComponentMDXLayout>
    </DocsShell>
  );
};
