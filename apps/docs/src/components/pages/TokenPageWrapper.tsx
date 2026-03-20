import { FunctionComponent, ReactNode } from 'react';
import { DocsShell } from '../DocsShell';

interface TokenPageWrapperProps {
  currentPath: string;
  children: ReactNode;
}

export const TokenPageWrapper: FunctionComponent<TokenPageWrapperProps> = ({ currentPath, children }) => (
  <DocsShell currentPath={currentPath}>
    {children}
  </DocsShell>
);
