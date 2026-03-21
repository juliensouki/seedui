/**
 * Astro integration that patches the React renderer to collect
 * styled-components CSS during SSR and inject it into the HTML.
 *
 * This works by wrapping the vnode with ServerStyleSheet.collectStyles()
 * before rendering, then prepending the collected <style> tags to the HTML.
 */
export default function styledSSR() {
  return {
    name: 'styled-components-ssr',
    hooks: {
      'astro:config:setup'({ updateConfig }) {
        updateConfig({
          vite: {
            plugins: [styledSSRVitePlugin()],
          },
        });
      },
    },
  };
}

function styledSSRVitePlugin() {
  return {
    name: 'vite-plugin-styled-ssr',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('react') || !id.includes('server')) return null;
      if (!code.includes('renderToStaticMarkup')) return null;

      const transformed = code
        .replace(
          'const vnode = React.createElement(Component, newProps);',
          `const _rawVnode = React.createElement(Component, newProps);
           let _sheet;
           let vnode;
           try {
             const { ServerStyleSheet } = await import('@seedui-react/seedui');
             if (ServerStyleSheet) {
               _sheet = new ServerStyleSheet();
               vnode = _sheet.collectStyles(_rawVnode);
             } else {
               vnode = _rawVnode;
             }
           } catch {
             vnode = _rawVnode;
           }`
        )
        .replace(
          'return { html, attrs };',
          `if (_sheet) {
             try {
               const styleTags = _sheet.getStyleTags();
               _sheet.seal();
               if (styleTags.length > 0) {
                 html = styleTags + html;
               }
             } catch {
               try { _sheet.seal(); } catch {}
             }
           }
           return { html, attrs };`
        );

      if (transformed !== code) {
        return { code: transformed, map: null };
      }
      return null;
    },
  };
}
