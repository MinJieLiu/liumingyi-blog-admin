import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import {
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import { enableMap } from '../../common/fieldMap';
import { GET_ROLE_FOR_SELECT } from '../../services/role';
import queryFilter from '../../common/queryFilter';

const Container = styled.div`
  display: inline-block;
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

/**
 * 用户表单
 */
class FormModal extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    userItem: PropTypes.object,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    userItem: {},
  };

  state = {
    visible: false,
  };

  handleShowModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleHideModal = () => {
    this.setState({
      visible: false,
    });
  };

  // 保存
  handleSubmit = async (e) => {
    e.preventDefault();
    this.handleHideModal();
  };

  render() {
    const {
      userItem,
      children,
    } = this.props;

    const { getFieldDecorator } = this.props.form;

    return (
      <Container>
        <span onClick={this.handleShowModal}>{children}</span>
        <Modal
          title={`用户${userItem.id ? '编辑' : '新增'}`}
          visible={this.state.visible}
          onCancel={this.handleHideModal}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="用户名">
              {getFieldDecorator('username', {
                initialValue: userItem.username,
                rules: [
                  { required: true, message: '必填' },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
                initialValue: userItem.email,
                rules: [
                  { required: true, message: '必填' },
                  { type: 'email', message: '格式不正确' },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="手机">
              {getFieldDecorator('mobile', {
                initialValue: userItem.mobile,
                rules: [
                  { required: true, message: '必填' },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="昵称">
              {getFieldDecorator('nickname', {
                initialValue: userItem.nickname,
                rules: [
                  { len: 11, message: '格式不正确' },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="启用状态">
              {getFieldDecorator('enable', {
                initialValue: userItem.enable,
                rules: [
                  { required: true, message: '必填' },
                ],
              })(
                <Select placeholder="请选择">
                  <Select.Option value="">请选择</Select.Option>
                  {Object.keys(enableMap).map(n => (
                    <Select.Option key={n} value={n}>{enableMap[n]}</Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label="角色">
              <Query query={GET_ROLE_FOR_SELECT}>
                {queryFilter(({ data }) =>
                  getFieldDecorator('roles', {
                    initialValue: userItem.roles,
                    rules: [
                      { required: true, message: '必填' },
                    ],
                  })(
                    <Select
                      showSearch
                      mode="multiple"
                      placeholder="请选择"
                    >
                      {data.roleList.rows.map(item => (
                        <Select.Option key={item.id}>{item.name}</Select.Option>
                      ))}
                    </Select>,
                  ),
                )}
              </Query>
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    );
  }
}

export default Form.create()(FormModal);
