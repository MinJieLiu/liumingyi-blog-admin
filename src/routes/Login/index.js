import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { Mutation } from 'react-apollo';
import { Form, Icon, Input, Button, message } from 'antd';
import { LOGIN } from '../../services/user';
import { getCurrentErrorMessage } from '../../utils/graphQLErrorHandler';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    ${props => darken(0.2, props.theme.primaryColor)} 5%,
    ${props => props.theme.primaryColor} 100%
  );
  overflow: hidden;
`;

const Content = styled.div`
  padding: 40px;
  width: 400px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  margin-bottom: 24px;
  font-size: 24px;
`;

class Login extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleSubmit = (e, login) => {
    e.preventDefault();
    const { form, history } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { data } = await login({
            variables: values,
          });
          if (data.login.id) {
            history.replace('/');
          }
        } catch (ex) {
          message.error(getCurrentErrorMessage(ex));
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Mutation mutation={LOGIN}>
        {(login, { loading }) => (
          <Container>
            <Content>
              <Logo>Welcome!</Logo>
              <Form onSubmit={e => this.handleSubmit(e, login)}>
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名！' }],
                  })(
                    <Input
                      prefix={<Icon type="user" />}
                      placeholder="用户名"
                      maxLength={20}
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码！' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" />}
                      type="password"
                      placeholder="密码"
                      maxLength={20}
                    />,
                  )}
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  登录
                </Button>
              </Form>
            </Content>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default Form.create()(Login);
