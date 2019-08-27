module.exports = {
  outputDir: '../spaceoverview/src/main/resources/assets',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
};
