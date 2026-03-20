import { FunctionComponent } from 'react';
import { DocsShell } from '../../DocsShell';
import { TypographyPage } from './TypographyPage';

export const TypographyPageFull: FunctionComponent = () => (
  <DocsShell currentPath="/tokens/typography">
    <TypographyPage />
  </DocsShell>
);
