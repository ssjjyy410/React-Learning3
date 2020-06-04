/**
 * webpack配置扩展文件
 */
const { override, fixBabelImports,addLessLoader,addDecoratorsLegacy} = require('customize-cra')
// const lessVars=require('./lessVars') 

module.exports = override(
  fixBabelImports('import',{
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: lessVars
    modifyVars:{'@primary-color': '#1DA57A'} 
  }),
  addDecoratorsLegacy(),
)