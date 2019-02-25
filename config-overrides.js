/* eslint-disable import/no-extraneous-dependencies */

const {
  override,
  fixBabelImports,
  addBabelPlugin,
  addLessLoader,
} = require('customize-cra');
const theme = require('./src/theme');

module.exports = override(
  addBabelPlugin('styled-components'),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme.lessVarConfig,
  }),
);
