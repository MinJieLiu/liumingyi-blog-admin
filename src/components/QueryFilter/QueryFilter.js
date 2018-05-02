import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner';

/**
 * GraphQL 查询过滤
 */
const QueryFilter = ({
  loading,
  error,
  render,
  ...props
}) => {
  if (loading) return <Spinner size="large" />;
  if (error) {
    // 跳转至登录
    if (error.networkError && error.networkError.statusCode === 401) {
      return <Redirect to={{ pathname: '/login' }} />;
    }
    // 输出错误信息
    message.error(error.message);
    return null;
  }
  return render(props);
};

QueryFilter.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  render: PropTypes.func.isRequired,
};

export default QueryFilter;
