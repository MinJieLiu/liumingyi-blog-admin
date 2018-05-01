import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import typeConfig from './typeConfig';

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Content = styled.div`
  width: auto;

  h1 {
    margin-bottom: 24px;
    color: #434e59;
    font-size: 72px;
    line-height: 1;
    font-weight: bold;
  }
`;

const Description = styled.div`
  color: #777;
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 16px;
`;

const Exception = ({
  type = '404',
  title,
  desc,
}) => (
  <Container>
    <Content>
      <h1>{title || typeConfig[type].title}</h1>
      <Description>{desc || typeConfig[type].desc}</Description>
      <a href="/">
        <Button type="primary">返回首页</Button>
      </a>
    </Content>
  </Container>
);

Exception.propTypes = {
  type: PropTypes.oneOf(['403', '404', '500']),
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default Exception;
