import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { SpacingPage } from './SpacingPage';

export const SpacingPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/tokens/spacing">
    <SpacingPage />
  </DocsShell>
);
