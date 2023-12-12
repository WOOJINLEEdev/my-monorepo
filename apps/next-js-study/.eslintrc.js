module.exports = {
  extends: ["next/core-web-vitals"],
  settings: {
    next: {
      rootDir: "apps/next-js-study",
    },
  },
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [".eslintrc.js"],
};
