import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { BorderRadiusPage } from './BorderRadiusPage';

export const BorderRadiusPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/tokens/border-radius">
    <BorderRadiusPage />
  </DocsShell>
);
