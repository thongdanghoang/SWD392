module.exports = {
  root: true,
  overrides: [{
    files: ["*.ts", "*.tsx"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["tsconfig.json"], createDefaultProgram: true
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/eslint-plugin/recommended", "plugin:react-hooks/recommended"],
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/member-ordering": ["error", {
        "default": ["public-static-field", "public-instance-field", "protected-static-field", "protected-instance-field", "private-static-field", "private-instance-field", "public-constructor", "protected-constructor", "private-constructor", "public-static-method", "public-instance-method", "protected-static-method", "protected-instance-method", "private-static-method", "private-instance-method"]
      }],
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/ban-tslint-comment": "error",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-regexp-exec": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/unified-signatures": "error",
      "@typescript-eslint/explicit-function-return-type": ["error", { "allowTypedFunctionExpressions": true }],
      "@typescript-eslint/no-explicit-any": "off",
      "no-duplicate-imports": "error",
      "dot-notation": "error",
      "eqeqeq": ["error", "smart"],
      "guard-for-in": "error",
      "max-lines": ["error", {
        "max": 400
      }],
      "max-lines-per-function": ["error", {
        "max": 35
      }],
      "no-bitwise": "error",
      "no-caller": "error",
      "no-console": ["error", {
        "allow": ["info", "warn", "error"]
      }],
      "no-else-return": "error",
      "no-eval": "error",
      "no-new-wrappers": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-undef-init": "error",
      "no-unused-expressions": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "object-shorthand": "error",
      "prefer-exponentiation-operator": "error",
      "prefer-object-spread": "error",
      "prefer-regex-literals": "error",
      "prefer-template": "error",
      "radix": "error",
      "sort-imports": ["error", {
        "ignoreDeclarationSort": true
      }],
      "spaced-comment": "error",
      "prettier/prettier": ["error", {
        "endOfLine": "auto",
        "bracketSpacing": false,
        "arrowParens": "avoid",
        "trailingComma": "none",
        "tabWidth": 2,
        "useTabs": false,
        "bracketSameLine": false
      }]
    }
  }, {
    files: ["*.tsx"], rules: {
      "max-lines-per-function": "off"
    }
  }],
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/eslint-plugin/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
  }
};
