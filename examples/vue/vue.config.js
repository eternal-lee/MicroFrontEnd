const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //引入插件
const isProduction = process.env.NODE_ENV === 'production'
module.exports = defineConfig({
  transpileDependencies: false,
  publicPath: '/subapp/vue',
  outputDir: './../../dist/subapp/vue',
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: false
            },
            warnings: false,
            // 删除console debugger 删除警告
            compress: {
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ['console.log', 'alert', 'debugger'] //移除console
            }
          }
        })
      ]
    }
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  productionSourceMap: !isProduction
})
