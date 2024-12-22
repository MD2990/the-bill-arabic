import pluginNext from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		name: "ESLint Config - nextjs",
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
			sourceType: "module",
			ecmaVersion: "latest",
		},

		plugins: {
			"@next/next": pluginNext,
			react: reactPlugin,
		},
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		rules: {
			...pluginNext.configs.recommended.rules,
			...pluginNext.configs["core-web-vitals"].rules,

			// Basic ESLint rules
			"no-unused-vars": "warn",
			"no-undef": "error",
			"no-unreachable": "warn",
			"no-empty": "warn",
			"no-unsafe-negation": "warn",
			"no-prototype-builtins": "warn",
			"no-async-promise-executor": "warn",
			"no-extra-semi": "warn",
			"no-func-assign": "warn",
			"use-isnan": "warn",
			"valid-typeof": "warn",
			"react/jsx-uses-react": "warn",
			"react/jsx-uses-vars": "warn",
			"no-console": "warn",
			"no-debugger": "warn",
			"no-constant-condition": "warn",
			"no-empty-function": "warn",
			"no-eval": "warn",
			"no-extra-bind": "warn",
			"no-extra-label": "warn",
			"no-extra-boolean-cast": "warn",
		},
	},
];
