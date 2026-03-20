import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { ColorsPage } from './ColorsPage';

export const ColorsPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/tokens/colors">
    <ColorsPage />
  </DocsShell>
);
