import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { BoxShadowPage } from './BoxShadowPage';

export const BoxShadowPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/tokens/box-shadow">
    <BoxShadowPage />
  </DocsShell>
);
