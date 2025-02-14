import sonarjs from 'eslint-plugin-sonarjs'
import pluginSecurity from 'eslint-plugin-security'
import importPlugin from 'eslint-plugin-import'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import promise from 'eslint-plugin-promise'
import unicorn from 'eslint-plugin-unicorn'
import todoWithLabel from 'eslint-plugin-todo-with-label'
import babelParser from '@babel/eslint-parser'
import * as sonar from 'eslint-plugin-sonar'

const sonarConfigWithoutBrokenRule = sonar.configs.flatRecommended.map(
  (sonarConfig) => {
    if (sonarConfig.rules['sonar/no-accessor-field-mismatch']) {
      delete sonarConfig.rules['sonar/no-accessor-field-mismatch']
    }

    if (sonarConfig.rules['sonar/no-hardcoded-credentials']) {
      delete sonarConfig.rules['sonar/no-hardcoded-credentials']
    }

    return sonarConfig
  }
)

const MAX_DEPTH = 3
const MAX_COGNITIVE_COMPLEXITY = 20

const jsConfig = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...sonarConfigWithoutBrokenRule,
  sonarjs.configs.recommended,
  pluginSecurity.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false
      },
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        es6: true,
        browser: true,
        node: true,
        jest: true,
        fetch: true
      }
    },
    plugins: {
      promise,
      unicorn,
      'todo-with-label': todoWithLabel
    },
    rules: {
      'no-multiple-empty-lines': ['error', {max: 1}],
      'no-empty': ['error', {allowEmptyCatch: true}],
      curly: ['error', 'all'],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'eol-last': ['error', 'always'],
      camelcase: ['error', {properties: 'never', ignoreDestructuring: true}],
      eqeqeq: ['error', 'always', {null: 'ignore'}],
      'prefer-const': ['error', {ignoreReadBeforeAssign: true}],
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'prefer-rest-params': 'error',
      'prefer-object-spread': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-promise-reject-errors': 'error',
      'object-shorthand': 'error',
      'no-magic-numbers': [
        'error',
        {
          ignore: [0, 1, -1, 2, 24, 60, 100, 1000],
          enforceConst: true,
          ignoreDefaultValues: true,
          ignoreClassFieldInitialValues: true
        }
      ],
      'dot-notation': 'error',
      'max-depth': ['error', MAX_DEPTH],
      'max-nested-callbacks': ['error', MAX_DEPTH],
      'max-params': ['error', MAX_DEPTH],
      'max-classes-per-file': 'error',
      'require-await': 'error',
      'new-cap': 'error',
      'no-prototype-builtins': 'off',
      'no-global-assign': 'error',
      'no-extend-native': 'error',
      'no-else-return': 'error',
      'no-alert': 'error',
      'no-debugger': 'error',
      'no-console': ['error', {allow: ['warn', 'error']}],
      'no-unsafe-optional-chaining': [
        'error',
        {disallowArithmeticOperators: true}
      ],
      'no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}
      ],
      'no-unused-expressions': [
        'error',
        {
          enforceForJSX: true,
          allowShortCircuit: false,
          allowTernary: false
        }
      ],
      'no-sequences': ['error', {allowInParentheses: false}],
      'no-implicit-coercion': [
        'error',
        {
          boolean: false,
          disallowTemplateShorthand: false
        }
      ],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'block-like'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        },
        {
          blankLine: 'any',
          prev: ['const', 'let'],
          next: ['const', 'let']
        },
        {
          blankLine: 'always',
          prev: 'expression',
          next: ['const', 'let']
        },
        {
          blankLine: 'always',
          prev: ['const', 'let'],
          next: 'expression'
        }
      ],
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': ['error', {defaultAssignment: false}],
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'no-throw-literal': 'error',
      'no-template-curly-in-string': 'error',
      'no-empty-function': ['error', {allow: ['arrowFunctions']}],
      'no-constant-condition': [
        'error',
        {
          checkLoops: false
        }
      ],
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-absolute-path': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-default-export': 'error',
      'import/no-duplicates': ['error', {considerQueryString: true}],
      'import/no-self-import': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-anonymous-default-export': 'error',
      // https://github.com/import-js/eslint-plugin-import/commit/e5edf49ecdc745a947ef7931b5dee0ef858d6b93#diff-7d2908b010ec724c0f3a0d7615cb91f4673d765d52c6ba6607501e23470f2966R96
      // 'import/no-unused-modules': [
      //   'error',
      //   {missingExports: false, unusedExports: true}
      // ]
      'import/no-unresolved': [
        'error',
        {
          caseSensitiveStrict: true,
          // https://github.com/import-js/eslint-plugin-import/issues/3140#issuecomment-2591619825
          ignore: [
            'typescript-eslint',
            'eslint-plugin-react-prefer-function-component'
          ]
        }
      ],
      'import/newline-after-import': ['error', {considerComments: true}],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'index',
            'sibling'
          ],
          'newlines-between': 'ignore'
        }
      ],
      'promise/catch-or-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/no-multiple-resolved': 'error',
      'promise/prefer-await-to-then': 'error',
      'unicorn/error-message': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/catch-error-name': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/no-useless-promise-resolve-reject': 'error',
      'unicorn/filename-case': [
        'error',
        {cases: {kebabCase: true, camelCase: true, pascalCase: true}}
      ],
      'sonar/anchor-precedence': 'error',
      'sonar/bool-param-default': 'error',
      'sonar/concise-regex': 'error',
      'sonar/disabled-auto-escaping': 'error',
      'sonar/disabled-resource-integrity': 'error',
      'sonar/destructuring-assignment-syntax': 'off',
      'sonar/empty-string-repetition': 'error',
      'sonar/function-name': [
        'error',
        {format: '^_?\\$?[a-zA-Z][a-zA-Z0-9]*\\$?$'}
      ],
      'sonar/function-return-type': 'error',
      'sonar/link-with-target-blank': 'error',
      'sonar/max-union-size': 'off',
      'sonar/no-clear-text-protocols': 'error',
      'sonar/no-empty-after-reluctant': 'error',
      'sonar/no-function-declaration-in-block': 'error',
      'sonar/no-global-this': 'error',
      'sonar/no-globals-shadowing': 'error',
      'sonar/no-hardcoded-ip': 'error',
      'sonar/no-incorrect-string-concat': 'error',
      'sonar/no-invariant-returns': 'error',
      'sonar/non-number-in-arithmetic-expression': 'error',
      'sonar/post-message': 'error',
      'sonar/prefer-type-guard': 'error',
      'sonar/redundant-type-aliases': 'error',
      'sonar/stateful-regex': 'error',
      'sonar/unused-named-groups': 'error',
      'sonar/xpath': 'error',
      'sonarjs/todo-tag': 'off',
      'sonarjs/fixme-tag': 'off',
      'sonarjs/prefer-read-only-props': 'off',
      'sonarjs/cognitive-complexity': ['error', MAX_COGNITIVE_COMPLEXITY],
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-new-buffer': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-non-literal-require': 'error',
      'security/detect-object-injection': 'off',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',
      'security/detect-unsafe-regex': 'off',
      'security/detect-bidi-characters': 'error',
      'todo-with-label/has-valid-pattern': [
        'error',
        {
          pattern:
            '^((TODO|FIXME|BUG): \\(\\w+-\\d+\\)|(NOTE|COMMENT|HACK|INFO): (\\(\\w+-\\d+\\))?)\\ (.*)$'
        }
      ]
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    ignores: [
      '.git/',
      'node_modules/',
      'bower_components/',
      'jspm_packages/',
      'lib-cov/',
      'coverage/',
      '.nyc_output/',
      '.cache/',
      'build/',
      'dist/',
      'tmp/',
      '**/*.min.*'
    ]
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
      'no-magic-numbers': 'off',
      'max-classes-per-file': 'off',
      'max-nested-callbacks': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-identical-functions': 'off'
    }
  }
]

export {jsConfig}
