const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const path = require("path");

module.exports = {
  // 1. register the docs panel (as opposed to '@storybook/addon-docs' which
  //    will configure everything with a preset)
  addons: ['@storybook/addon-docs/register'],
  // 2. manually configure webpack, since you're not using the preset
  webpackFinal: async (config) => {
    config.module.rules.push({
      // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
      //     the docs page from the markdown
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          // Need to add babel-loader as dependency: `yarn add -D babel-loader`
          loader: require.resolve('babel-loader'),
          // may or may not need this line depending on your app's setup
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    });

    // 2b. Run `source-loader` on story files to show their source code
    //     automatically in `DocsPage` or the `Source` doc block.
    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve('@storybook/source-loader'),
      exclude: [/node_modules/],
      enforce: 'pre',
    });
    return config;
  },

  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        vueDocgenOptions: {
          alias: {
            '@': path.resolve(__dirname, '../')
          },
        },
      }
    }
  ],
  "framework": "@storybook/vue",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}
