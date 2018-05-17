import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import {
  Modal,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import { enableMap } from '../../common/fieldMap';
import { CREATE_USER, UPDATE_USER } from '../../services/user';
import { GET_ROLE_FOR_SELECT } from '../../services/role';
import queryFilter from '../../common/queryFilter';
import { getCurrentErrorMessage } from '../../utils/graphQLErrorHandler';
import {
  convertToIntArr,
} from '../../utils/queryHelper';

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
  handleSave = async (mutate) => {
    const { form, userItem } = this.props;

    // validate
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await mutate({
            variables: {
              input: {
                ...userItem,
                ...values,
                roleIds: convertToIntArr(values.roleIds),
              },
            },
          });
          this.handleHideModal();
        } catch (ex) {
          message.error(getCurrentErrorMessage(ex));
        }
      }
    });
  };

  render() {
    const {
      userItem,
      children,
    } = this.props;

    const { getFieldDecorator } = this.props.form;

    return (
      <Mutation mutation={userItem.id ? UPDATE_USER : CREATE_USER}>
        {(mutate, { loading }) => (
          <Fragment>
            <span onClick={this.handleShowModal}>{children}</span>
            <Modal
              title={`用户${userItem.id ? '编辑' : '新增'}`}
              visible={this.state.visible}
              confirmLoading={loading}
              onCancel={this.handleHideModal}
              onOk={() => this.handleSave(mutate)}
            >
              <Form>
                <Form.Item {...formItemLayout} label="用户名">
                  {getFieldDecorator('username', {
                    initialValue: userItem.username,
                    rules: [
                      { required: true, message: '必填' },
                    ],
                  })(<Input />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="密码">
                  {getFieldDecorator('password', {
                    initialValue: '',
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
                      getFieldDecorator('roleIds', {
                        initialValue: userItem.roles ? userItem.roles.map(n => n.id) : [],
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
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default Form.create()(FormModal);
