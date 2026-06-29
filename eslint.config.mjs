import nextPlugin from 'eslint-plugin-next';

export default [
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
    settings: {
      next: {
        rootDir: './',
      },
    },
  },
  {
    ignores: ['.next/', 'node_modules/', 'legacy_pages_backup/'],
  }
];