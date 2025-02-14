import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

const tsConfig = tseslint.config(
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    ignores: ['*.d.ts']
  },
  {
    files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
    extends: [
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      importPlugin.flatConfigs.typescript
    ],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}
      ],
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        {allow: ['arrowFunctions']}
      ],
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [0, 1, -1, 2, 24, 60, 100, 1000],
          enforceConst: true,
          ignoreDefaultValues: true,
          ignoreClassFieldInitialValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {'ts-expect-error': 'allow-with-description'}
      ]
    }
  },
  {
    files: [
      '**/test/**',
      '**/tests/**',
      '**/spec/**',
      '**/__tests__/**',
      '**/__stories__/**',
      '*.test.*',
      '*.spec.*',
      '*.story.*',
      '*.e2e.*',
      '*.e2e-spec.*'
    ],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off'
    }
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked]
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'import/no-default-export': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
)

export {tsConfig}
