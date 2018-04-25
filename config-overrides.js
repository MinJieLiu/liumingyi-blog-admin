/* eslint-disable import/no-extraneous-dependencies */

const { injectBabelPlugin, compose } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

const rewires = compose(
  config => injectBabelPlugin(['styled-components'], config),
  rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  config => injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config),
);

module.exports = (config, env) => rewires(config, env);
