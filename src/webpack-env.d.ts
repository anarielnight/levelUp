// Merges `context` into the NodeJS `Require` interface — @types/node types the
// global `require` as `NodeJS.Require`. Do NOT replace with a fresh
// `declare var require` (it would redeclare the global and break `tsc`).
// Webpack rewrites `require.context` at build time; this only types the call.

interface WebpackRequireContext {
  keys(): string[];
  resolve(request: string): string;
  <T = unknown>(request: string): T;
  readonly id: string;
}

declare namespace NodeJS {
  interface Require {
    context(
      directory: string,
      useSubdirectories: boolean,
      fileRegExp: RegExp,
      mode?: 'sync' | 'weak' | 'lazy' | 'lazy-weak',
    ): WebpackRequireContext;
  }
}
