const { useBabelRc, override, fixBabelImports, addLessLoader } = require('customize-cra')
module.exports = override(
  useBabelRc(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 'primary-color': '#13c2c2' },
  }),
)
