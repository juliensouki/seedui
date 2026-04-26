/// <reference types="astro/client" />

declare module '*.mdx' {
  export const meta: {
    title: string;
    description: string;
    name?: string;
    category?: string;
  };
}
