import { componentDocs, categoryOrder } from './components';

export interface NavPage {
  name: string;
  path: string;
  section?: string;
}

export const gettingStartedPages: NavPage[] = [
  { name: 'Overview', path: '/', section: 'Getting Started' },
  { name: 'Installation', path: '/getting-started/installation', section: 'Getting Started' },
  { name: 'Quick Start', path: '/getting-started/quick-start', section: 'Getting Started' },
];

export type ThemeCategory = 'Configuration' | 'Design Tokens';

export const themeCategoryOrder: ThemeCategory[] = ['Configuration', 'Design Tokens'];

const configurationPages: NavPage[] = [
  { name: 'ThemeProvider', path: '/theming/theme-provider', section: 'Theme' },
  { name: 'Component Styles', path: '/theming/component-styles', section: 'Theme' },
  { name: 'Default Props', path: '/theming/default-props', section: 'Theme' },
];

const tokenPages: NavPage[] = [
  { name: 'Colors', path: '/tokens/colors', section: 'Design Tokens' },
  { name: 'Typography', path: '/tokens/typography', section: 'Design Tokens' },
  { name: 'Spacing', path: '/tokens/spacing', section: 'Design Tokens' },
  { name: 'Border Radius', path: '/tokens/border-radius', section: 'Design Tokens' },
  { name: 'Box Shadow', path: '/tokens/box-shadow', section: 'Design Tokens' },
  { name: 'Breakpoints', path: '/tokens/breakpoints', section: 'Design Tokens' },
];

export const themePagesByCategory: Record<ThemeCategory, NavPage[]> = {
  Configuration: configurationPages,
  'Design Tokens': tokenPages,
};

const componentPages: NavPage[] = categoryOrder.flatMap((cat) =>
  componentDocs
    .filter((d) => d.category === cat)
    .map((d) => ({ name: d.name, path: `/components/${d.name}`, section: cat })),
);

export const allPages: NavPage[] = [
  ...gettingStartedPages,
  ...configurationPages,
  ...tokenPages,
  ...componentPages,
];
