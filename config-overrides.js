/* eslint-disable import/no-extraneous-dependencies */

const { injectBabelPlugin, compose } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const theme = require('./src/theme');

const rewires = compose(
  config => injectBabelPlugin(['styled-components'], config),
  rewireLess.withLoaderOptions({
    modifyVars: theme.lessVarConfig,
  }),
  config => injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config),
);

module.exports = (config, env) => rewires(config, env);
