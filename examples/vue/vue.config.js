const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')
module.exports = defineConfig({
  transpileDependencies: false,
  publicPath: '/subapp/vue',
  outputDir: './../../dist/suapp/vue',
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd'
    }
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
