import React from 'react';
import styled from 'styled-components';
import { message, Spin } from 'antd';

const Spinner = styled(Spin)`
  width: 100%;
  margin: 40px 0;
`;

const QueryFilter = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    message.error(error.message);
    return error.message;
  }
  return children;
};

export default QueryFilter;
