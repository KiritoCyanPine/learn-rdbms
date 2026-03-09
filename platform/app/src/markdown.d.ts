/**
 * TypeScript module declarations for markdown and SQL files
 * Allows importing .md and .sql files as strings via webpack asset/source
 */

declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.sql' {
  const content: string;
  export default content;
}
