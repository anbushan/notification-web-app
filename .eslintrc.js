module.exports = {
    extends: ['react-app','eslint:recommended', 'prettier', 'plugin:prettier/recommended'],

    plugins: ['react', 'import', 'jsx-a11y', 'react-hooks'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      "extends": ["eslint:recommended", "plugin:prettier/recommended"],
       "rules": {
         "prettier/prettier": ["error", {}, { "usePrettierrc": true }]
           }
    },
    
  };
  