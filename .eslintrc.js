module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    // Add any custom rules here
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".next/",
    "out/",
    "*.config.js",
    "*.d.ts",
  ],
};
