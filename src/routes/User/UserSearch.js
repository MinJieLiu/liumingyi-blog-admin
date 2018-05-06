import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Button, Input, Select } from 'antd';
import { enableMap } from '../../common/fieldMap';
import { convertToNumberField } from '../../utils/apolloHandler';
import FormField from '../../components/Search/FormField';

const SearchContainer = styled.section`
  margin-bottom: 24px;
  overflow: hidden;
`;

const ButtonGroup = styled.div`
  button + button {
    margin-left: 10px;
  }
`;

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
    const {
      client,
      userQueryInput,
      form,
    } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        client.writeData({
          data: {
            userQueryInput: {
              ...userQueryInput,
              ...values,
              enable: convertToNumberField(values.enable),
            },
          },
        });
      }
    });
  };

  handleClear = () => {
    const {
      client,
      userQueryInput,
      form,
    } = this.props;
    form.resetFields();
    const values = form.getFieldsValue();
    client.writeData({
      data: {
        userQueryInput: {
          ...userQueryInput,
          ...values,
          enable: convertToNumberField(values.enable),
        },
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <SearchContainer>
        <Form onSubmit={this.handleSearch}>
          <Row type="flex" align="middle">
            <Col>
              <FormField label="用户名">
                {getFieldDecorator('username', { initialValue: '' })(<Input placeholder="用户名" maxLength={20} />)}
              </FormField>
            </Col>
            <Col>
              <FormField label="邮箱">
                {getFieldDecorator('email', { initialValue: '' })(<Input placeholder="邮箱" maxLength={20} />)}
              </FormField>
            </Col>
            <Col>
              <FormField label="手机">
                {getFieldDecorator('mobile', { initialValue: '' })(<Input placeholder="手机" maxLength={20} />)}
              </FormField>
            </Col>
            <Col>
              <FormField label="启用状态">
                {getFieldDecorator('enable', { initialValue: '' })(
                  <Select placeholder="请选择">
                    <Select.Option value="">请选择</Select.Option>
                    {Object.keys(enableMap).map(n => (
                      <Select.Option key={n} value={n}>{enableMap[n]}</Select.Option>
                    ))}
                  </Select>,
                )}
              </FormField>
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <ButtonGroup>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button onClick={this.handleClear}>清空</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      </SearchContainer>
    );
  }
}

export default Form.create()(UserSearch);
