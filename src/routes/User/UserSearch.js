import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
} from 'antd';
import queryFilter from '../../common/queryFilter';
import {
  FormField,
  SearchContainer,
} from '../../components/MainForm';
import FormModal from './FormModal';
import { GET_ROLE_FOR_SELECT } from '../../services/role';
import { defaultQueryInput } from '../../resolvers/user';


/**
 * 用户搜索
 */
class UserSearch extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    form: PropTypes.object,
    userQueryInput: PropTypes.object.isRequired,
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { client, userQueryInput, form } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        client.writeData({
          data: {
            userQueryInput: {
              ...userQueryInput,
              ...values,
            },
          },
        });
      }
    });
  };

  handleClear = () => {
    const { client, form } = this.props;
    form.resetFields();
    client.writeData({
      data: {
        userQueryInput: {
          ...defaultQueryInput,
        },
      },
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      userQueryInput,
    } = this.props;

    return (
      <SearchContainer>
        <Form onSubmit={this.handleSearch}>
          <Row type="flex" align="middle" gutter={24}>
            <Col span={6} xxl={4}>
              <FormField label="用户名">
                {getFieldDecorator('username', { initialValue: userQueryInput.username })(
                  <Input placeholder="用户名" maxLength={20} />,
                )}
              </FormField>
            </Col>
            <Col span={6} xxl={4}>
              <FormField label="邮箱">
                {getFieldDecorator('email', { initialValue: userQueryInput.email })(
                  <Input placeholder="邮箱" maxLength={20} />,
                )}
              </FormField>
            </Col>
            <Col span={6} xxl={4}>
              <FormField label="手机">
                {getFieldDecorator('mobile', { initialValue: userQueryInput.mobile })(
                  <Input placeholder="手机" maxLength={20} />,
                )}
              </FormField>
            </Col>
            <Col span={6} xxl={4}>
              <FormField label="角色">
                <Query query={GET_ROLE_FOR_SELECT}>
                  {queryFilter(({ data }) =>
                    getFieldDecorator('roleIds', { initialValue: userQueryInput.roleIds })(
                      <Select
                        showSearch
                        mode="multiple"
                        placeholder="角色"
                        filterOption={(input, option) => option.props.children.includes(input)}
                      >
                        {data.roleList.rows.map(item => (
                          <Select.Option key={item.id}>{item.name}</Select.Option>
                        ))}
                      </Select>,
                    ),
                  )}
                </Query>
              </FormField>
            </Col>
          </Row>
          <Row type="flex" align="middle" gutter={12}>
            <Col><Button type="primary" htmlType="submit">查询</Button></Col>
            <Col><Button onClick={this.handleClear}>清空</Button></Col>
            <Col>
              <FormModal>
                <Button onClick={this.handleClear}>新增</Button>
              </FormModal>
            </Col>
          </Row>
        </Form>
      </SearchContainer>
    );
  }
}

export default Form.create()(UserSearch);
