/* eslint-env node */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jest/recommended',
    './rules/imports.cjs',
    // This comes last so that prettier-config can turn off appropriate rules given the order of precedence by eslint 'extends'
    require.resolve('eslint-config-uber-universal-stage-3'),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ],
  rules: {
    // Enforce flow file declarations
    // 'flowtype/require-valid-file-annotation': ['error', 'always'],

    // We should be using flow rather than propTypes
    'react/prop-types': 'off',

    // Enforces consistent spacing within generic type annotation parameters.
    // https://github.com/gajus/eslint-plugin-flowtype/blob/master/.README/rules/generic-spacing.md
    // 'flowtype/generic-spacing': 'off',

    // Enforce hook rules
    // https://reactjs.org/docs/hooks-faq.html#what-exactly-do-the-lint-rules-enforce
    'react-hooks/rules-of-hooks': 'error',
    // https://github.com/facebook/react/issues/14920
    'react-hooks/exhaustive-deps': 'warn',

    // Fix inconsistency between Flow (inherited rule from flowtype/recommended) and Prettier
    // https://jeng.uberinternal.com/browse/WPT-3404
    'flowtype/space-after-type-colon': 'off',

    'require-atomic-updates': 0,
    'dot-notation': 'error',
    // disabled because it does not really work when mixing ts and js files
    'import/no-unresolved': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
