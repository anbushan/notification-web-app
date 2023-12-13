module.exports = {
    extends: ['react-app', 'plugin:prettier/recommended'],
    plugins: ['react', 'import', 'jsx-a11y', 'react-hooks'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  };
  