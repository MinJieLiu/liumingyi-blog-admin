import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ApolloConsumer } from 'react-apollo';
import { Form, Icon, Input, Button } from 'antd';
import { LOGIN } from '../../services/user';

const FormItem = Form.Item;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #ccc 5%, #eee 100%);
  overflow: hidden;
`;

const Content = styled.div`
  padding: 40px;
  width: 400px;
  background: white;
  border-radius: 4px;
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

  handleSubmit = (e, client) => {
    e.preventDefault();
    const { form, history } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const { data } = await client.query({
          query: LOGIN,
          variables: values,
        });
        if (data.login.id) {
          history.replace('/');
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <ApolloConsumer>
        {client => (
          <Container>
            <Content>
              <Logo>Welcome!</Logo>
              <Form onSubmit={e => this.handleSubmit(e, client)}>
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名！' }],
                  })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码！' }],
                  })(<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />)}
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </Content>
          </Container>
        )}
      </ApolloConsumer>
    );
  }
}

export default Form.create()(Login);
