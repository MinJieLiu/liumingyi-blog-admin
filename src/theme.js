const kebabCase = require('lodash/kebabCase');
const mapKeys = require('lodash/mapKeys');

/**
 * styled-components 和 antd 共用变量
 * @type {Object}
 */
const themeConfig = {
  // customized
  // antd
  primaryColor: '#1DA57A',
};

exports.lessVarConfig = (() => mapKeys(themeConfig, (value, key) => `@${kebabCase(key)}`))();

exports.themeConfig = themeConfig;
