import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
      }),
    ],
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
  };
});
