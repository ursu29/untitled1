const {
  useBabelRc,
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
} = require('customize-cra')
const path = require('path')
const fs = require('fs')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')

const themeExample = require(path.join(__dirname, './src/themes/light.js'))

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src/themes'),
  varFile: path.join(__dirname, './src/themes/variables.less'),
  mainLessFile: path.join(__dirname, './src/themes/main.less'),
  themeVariables: Object.keys(themeExample),
  // themeVariables: ['@primary-color'],
  indexFileName: false,
  generateOnce: false,
  lessUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js',
  publicPath: '',
}

module.exports = override(
  useBabelRc(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    modifyVars: {
      // '@primary-color': '#002251',
    },
    javascriptEnabled: true,
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options)),
)
