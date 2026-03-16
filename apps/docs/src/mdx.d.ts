declare module '*.mdx' {
  import type { FunctionComponent } from 'react';
  const MDXComponent: FunctionComponent;
  export default MDXComponent;
  export const meta: {
    title: string;
    description: string;
    toc: Array<{ id: string; label: string }>;
  };
}
