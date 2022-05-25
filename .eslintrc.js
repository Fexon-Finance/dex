module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    // 'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      },
    },
  },
  rules: {
    'jsx-a11y/anchor-is-valid': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'prettier/prettier': 0,
    'react/no-unescaped-entities': 0,
    indent: 'off',
    '@typescript-eslint/indent': [ 'error', 2 ],
    semi: 'off',
    '@typescript-eslint/semi': [ 'error' ],
    'no-multiple-empty-lines': [ 'error', { max: 1 } ],
    'space-infix-ops': [ 'error', { int32Hint: false } ],
    'computed-property-spacing': [ 'error' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'react/jsx-filename-extension': [ 2, { extensions: [ '.js', '.jsx', '.ts', '.tsx' ] } ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
