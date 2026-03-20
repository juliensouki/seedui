interface ImportMeta {
  glob<T>(pattern: string): Record<string, () => Promise<T>>;
}
