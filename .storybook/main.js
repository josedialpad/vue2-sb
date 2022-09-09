const path = require("path");

module.exports = {
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
