import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../projects/**/*.stories.@(js|ts|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  // this is required to avoud having to restart stroybook to get sass changes (still need to refresh page)
  webpackFinal: async (config) => {
    // Find all rules that process SCSS files.
    const scssRules = config.module?.rules?.filter(
      // dx code, any is fine here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rule): rule is { test: RegExp; use: any[] } =>
        typeof rule === 'object' &&
        rule !== null &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.toString().includes('scss')
    );

    scssRules?.forEach((rule) => {
      // The 'use' property contains the loaders.
      if (Array.isArray(rule.use)) {
        // Find and replace any loader that extracts CSS to a file with style-loader.
        // This is common in Angular builds and breaks hot-reloading.
        const miniCssExtractIndex = rule.use.findIndex(
          (loader) =>
            typeof loader === 'object' &&
            loader !== null &&
            'loader' in loader &&
            typeof loader.loader === 'string' &&
            loader.loader.includes('mini-css-extract-plugin')
        );

        if (miniCssExtractIndex !== -1) {
          // Replace the extractor with style-loader.
          rule.use[miniCssExtractIndex] = { loader: 'style-loader' };
        } else {
          // If no extractor is found, ensure style-loader is at the beginning of the chain.
          const hasStyleLoader = rule.use.some(
            (loader) =>
              (typeof loader === 'string' && loader.includes('style-loader')) ||
              (typeof loader === 'object' &&
                loader !== null &&
                'loader' in loader &&
                typeof loader.loader === 'string' &&
                loader.loader.includes('style-loader'))
          );

          if (!hasStyleLoader) {
            rule.use.unshift({ loader: 'style-loader' });
          }
        }
      }
    });

    return config;
  },
};

export default config;
