const CracoLessPlugin = require('craco-less');
// const { dirname } = require('path');
const path = require('path');
const resolve = dir => path.resolve(__dirname,dir)

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'red' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve('src'),
      "components": resolve('src/components'),
      "assets": resolve('src/assets'),
      "network": resolve('src/network'),
      "router": resolve('src/router'),
      "static": resolve('src/static'),
      "store": resolve('src/store'),
      "utils": resolve('src/utils'),
      "views": resolve('src/views'),
    }
  }
};