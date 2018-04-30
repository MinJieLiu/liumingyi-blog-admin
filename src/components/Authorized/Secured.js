import React from 'react';
import Exception from '../Exception';
import Authorized from './Authorized';

/**
 * 默认错误组件
 */
const Exception403 = () => <Exception type="403" />;

/**
 * 用于判断是否拥有访问此 view 的权限
 * @param { string | Array | function } authority
 * @param { React.Component } error
 */
export default (authority, error) => targer => (
  <Authorized
    authority={authority}
    noMatch={error ? () => error : Exception403}
  >
    {targer}
  </Authorized>
);
