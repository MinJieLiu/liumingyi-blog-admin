import React from 'react';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Spinner from '../components/Spinner';
import Exception from '../components/Exception';

/**
 * GraphQL 查询过滤
 */
export default render => ({
  loading,
  data,
  error,
  ...props
}) => {
  if (loading && isEmpty(data)) return <Spinner size="large" />;
  if (error) {
    // 跳转至登录
    if (error.networkError && error.networkError.statusCode === 401) {
      return <Redirect to={{ pathname: '/login' }} />;
    }
    // 输出错误信息
    return <Exception title="Error" desc={error.message} />;
  }
  return render({
    loading,
    data,
    ...props,
  });
};
