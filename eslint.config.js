// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "arrow-body-style": "error",
      "capitalized-comments": "error",
      "consistent-this": "error",
      "curly": "error",
      "eqeqeq": "error",
      "func-style": "error",
      "logical-assignment-operators": ["error", "never"],
      "max-lines": ["error", { "max": 300, "skipComments": false }],
      "max-lines-per-function": ["error", { "max": 30, "skipComments": false }],
      "max-params": ["error", {"max": 3}],
      "no-bitwise": "error",
      "no-console": "error",
      "no-debugger": "error",
      "no-empty": "error",
      "no-empty-function": "error",
      "no-empty-static-block": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-invalid-this": "error",
      "no-irregular-whitespace": "error",
      "no-negated-condition": "error",
      "no-nested-ternary": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": "error",
      "no-proto": "error",
      "no-redeclare": "error",
      "no-return-assign": "error",
      "no-self-compare": "error",
      "no-shadow": "error",
      "no-sparse-arrays": "error",
      "no-unassigned-vars": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "no-use-before-define": "error",
      "no-useless-assignment": "error",
      "no-useless-call": "error",
      "no-useless-catch": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "no-with": "error",
      "prefer-object-spread": "error",
      "prefer-spread": "error",
      "use-isnan": "error",
      "yoda": "error",
    },
  },
  {
    files: ["src/main.ts"],
    rules: {
      "no-console": "off"
    }
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
