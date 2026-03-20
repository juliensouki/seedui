import { FunctionComponent } from 'react';
import { DocsShell } from '../DocsShell';
import { HomePage } from '../HomePage';

export const HomePageWrapper: FunctionComponent = () => (
  <DocsShell currentPath="/">
    <HomePage />
  </DocsShell>
);
