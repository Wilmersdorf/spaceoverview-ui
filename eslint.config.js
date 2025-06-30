const productionOnly = process.env.VITE_APP_DEVELOPMENT === 'true' ? 'warn' : 'error'

import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  js.configs.all,
  ...pluginVue.configs['flat/recommended'],
  { files: ['**/*.{js,vue}'] },
  {
    ignores: ['build/*']
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        Modal: 'readonly'
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-console': productionOnly,
      'no-empty': productionOnly,
      'no-lonely-if': productionOnly,
      'no-unused-vars': productionOnly,
      'no-useless-concat': productionOnly,
      'prefer-const': productionOnly,
      'vue/no-unused-components': productionOnly,
      'vue/no-unused-vars': productionOnly,
      'arrow-body-style': 'off',
      'capitalized-comments': 'off',
      'id-length': 'off',
      'init-declarations': 'off',
      'max-depth': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'max-params': 'off',
      'max-statements': 'off',
      'multiline-comment-style': 'off',
      'no-await-in-loop': 'off',
      'no-else-return': 'off',
      'no-magic-numbers': 'off',
      'no-negated-condition': 'off',
      'no-new': 'off',
      'no-promise-executor-return': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'one-var': 'off',
      'operator-assignment': 'off',
      'prefer-named-capture-group': 'off',
      'prefer-template': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/require-default-prop': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/v-on-event-hyphenation': 'off',
      complexity: 'off'
    }
  }
]
