import { FunctionComponent, ReactNode } from 'react';
import { DocsShell } from './DocsShell';

interface PageWrapperProps {
  currentPath: string;
  children: ReactNode;
}

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({ currentPath, children }) => {
  return (
    <DocsShell currentPath={currentPath}>
      {children}
    </DocsShell>
  );
};
