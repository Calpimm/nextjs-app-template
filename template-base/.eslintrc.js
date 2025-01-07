module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Add or override any ESLint rules here
    'react/jsx-key': 'off',
  },
};
