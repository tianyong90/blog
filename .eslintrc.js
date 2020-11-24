module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  // add your custom rules here
  rules: {
    'no-undef': 'off',
    'import/namespace': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems: 3,
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 3,
      },
    ],

  },
}
