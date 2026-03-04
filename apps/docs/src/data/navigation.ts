import { componentDocs, categoryOrder } from './components';

export interface NavPage {
  name: string;
  path: string;
}

export const gettingStartedPages: NavPage[] = [
  { name: 'Overview', path: '/' },
  { name: 'Installation', path: '/getting-started/installation' },
  { name: 'Quick Start', path: '/getting-started/quick-start' },
];

export const tokenPages: NavPage[] = [
  { name: 'Colors', path: '/tokens/colors' },
  { name: 'Typography', path: '/tokens/typography' },
  { name: 'Spacing', path: '/tokens/spacing' },
  { name: 'Border Radius', path: '/tokens/border-radius' },
  { name: 'Box Shadow', path: '/tokens/box-shadow' },
  { name: 'Breakpoints', path: '/tokens/breakpoints' },
];

const componentPages: NavPage[] = categoryOrder.flatMap((cat) =>
  componentDocs
    .filter((d) => d.category === cat)
    .map((d) => ({ name: d.name, path: `/components/${d.name}` })),
);

export const allPages: NavPage[] = [
  ...gettingStartedPages,
  ...tokenPages,
  ...componentPages,
];
