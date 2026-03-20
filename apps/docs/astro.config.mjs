import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdxRollup from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import styledSSR from './src/integrations/styled-ssr.mjs';

// Minimal document shim for SSR — styled-components and createPortal need this.
// ServerStyleSheet handles actual CSS collection; this just prevents crashes.
if (typeof globalThis.document === 'undefined') {
  const noop = () => ({});
  const el = {
    appendChild: noop, removeChild: noop, insertBefore: noop,
    querySelector: () => null, querySelectorAll: () => [],
    createElement: () => el, createTextNode: () => el,
    getAttribute: () => null, setAttribute: noop,
    parentNode: null, childNodes: [], style: {},
    sheet: null, ownerDocument: null, nodeType: 1,
    head: null, body: null, styleSheets: [],
    addEventListener: noop, removeEventListener: noop,
  };
  el.head = el;
  el.body = el;
  el.ownerDocument = el;
  globalThis.document = el;
}

export default defineConfig({
  integrations: [
    styledSSR(),
    react({ experimentalReactChildren: true }),
  ],
  output: 'static',
  vite: {
    plugins: [
      mdxRollup({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    ],
  },
});
