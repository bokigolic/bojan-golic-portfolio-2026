module.exports = [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    plugins: {
      react: require('eslint-plugin-react')
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      'react/jsx-key': 'error',
      'no-dupe-keys': 'error',
      'no-unreachable': 'error',
      'valid-typeof': 'error'
    }
  },
  { ignores: ["node_modules/**", "dist/**", "test-results/**", "playwright-report/**"] },
  { files: ["**/*.mjs"], languageOptions: { ecmaVersion: "latest", sourceType: "module" }, rules: { "no-dupe-keys": "error", "no-unreachable": "error" } }
];
