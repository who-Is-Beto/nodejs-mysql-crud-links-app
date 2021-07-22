module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["prettier", "airbnb-base"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "prettier/prettier": "error",
    quotes: [2, "double", "avoid-escape"],
    "global-require": 0,
    "comma-dangle": [2, "multiline"],
  },
};
