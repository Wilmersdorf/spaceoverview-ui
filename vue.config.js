const webpack = require('webpack')

module.exports = {
  outputDir: '../spaceoverview/src/main/resources/assets',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        onProxyReq(request) {
          request.setHeader('origin', 'http://localhost:8000')
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
}
