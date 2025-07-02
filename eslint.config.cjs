module.exports = [
  {
    files: ["server/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: true,
        process: true,
      },
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": "warn",
    },
  },
];
