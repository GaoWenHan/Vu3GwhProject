import vuePlugin from 'eslint-plugin-vue'
import tsParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json'
      },
      globals: {
        ...globals.jest,
        ...globals.browser
      }
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
        extraFileExtensions: ['.vue']
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.test.ts'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        ...globals.jest
      }
    }
  },
  {
    ignores: ['**/node_modules', '**/dist', '**/coverage', '**/*.config.js']
  }
]
