const path = require('path')
module.exports = {
  publicPath: '/qiye',
  devServer: {
    proxy: {
      '/api': {
        target: `https://www.bjd33.cn`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/variable.less')
      ]
    }
  }
}
