import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      "jsx-a11y": pluginA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...tseslint.configs.recommended.rules,

      "prettier/prettier": "error",
      "no-console": "error",
      "no-debugger": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-comment-textnodes": "off",
      "react/prop-types": "off",

      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "jsx-a11y/no-static-element-interactions": [
        "error",
        {
          allowExpressionValues: true,
          roles: ["button"],
        },
      ],
    },
  },
]);
