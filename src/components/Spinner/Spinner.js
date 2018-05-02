import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const SpinWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default props => (
  <SpinWrap>
    <Spin {...props} />
  </SpinWrap>
);
