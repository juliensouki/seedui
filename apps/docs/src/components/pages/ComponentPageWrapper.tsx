import { FunctionComponent, ReactNode } from 'react';
import { DocsShell } from '../DocsShell';
import { ComponentMDXLayout } from '../mdx/ComponentMDXLayout';

interface ComponentPageWrapperProps {
  currentPath: string;
  name: string;
  description: string;
  children: ReactNode;
}

export const ComponentPageWrapper: FunctionComponent<ComponentPageWrapperProps> = ({ currentPath, name, description, children }) => (
  <DocsShell currentPath={currentPath}>
    <ComponentMDXLayout name={name} description={description} currentPath={currentPath}>
      {children}
    </ComponentMDXLayout>
  </DocsShell>
);
