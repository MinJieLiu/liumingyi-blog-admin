import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import styled from 'styled-components';

const FormItem = styled(Form.Item)`
  &.ant-row {
    display: flex;
    align-items: center;
  }

  .ant-form-item-control-wrapper {
    flex: 1;
  }
`;

/**
 * 单个搜索条件域
 */
const FormField = ({ children, ...props }) => (
  <FormItem {...props}>{children}</FormItem>
);

FormField.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormField;
