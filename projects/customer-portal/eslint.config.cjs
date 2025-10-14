// @ts-check
const rootConfig = require('../../eslint.config.cjs');

let hasSelectorRules = false;

const componentSelectorRule = {
  '@angular-eslint/component-selector': [
    'error',
    {
      type: 'element',
      prefix: 'cp',
      style: 'kebab-case',
    },
  ],
};

const directiveSelectorRule = {
  '@angular-eslint/directive-selector': [
    'error',
    {
      type: 'attribute',
      prefix: 'cp',
      style: 'camelCase',
    },
  ],
};

const sharedUiConfig = rootConfig.map((config) => {
  if (config.files && config.files.includes('**/*.ts')) {
    hasSelectorRules = true;

    return {
      ...config,
      rules: {
        ...(config.rules || {}),
        ...componentSelectorRule,
        ...directiveSelectorRule,
      },
    };
  }

  return config;
});

if (!hasSelectorRules) {
  sharedUiConfig.push({
    files: ['**/*.ts'],
    rules: {
      ...componentSelectorRule,
      ...directiveSelectorRule,
    },
  });
}

module.exports = sharedUiConfig;
