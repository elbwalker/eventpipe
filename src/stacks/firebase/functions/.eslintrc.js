module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  ignorePatterns: [
    '/dist/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/no-unresolved': 0,
    indent: ['error', 2],
    // Set the maximum line length to 120 characters
    'max-len': ['error', 120],
    'valid-jsdoc': [
      'error',
      { requireParamType: false, requireReturnType: false },
    ],
  },
};
