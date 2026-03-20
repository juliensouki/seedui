import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { BreakpointsPage } from './BreakpointsPage';

export const BreakpointsPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/tokens/breakpoints">
    <BreakpointsPage />
  </DocsShell>
);
