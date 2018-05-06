import React, { Fragment } from 'react';
import { DateTime } from 'luxon';
import { Query } from 'react-apollo';
import { Table, Icon } from 'antd';
import { GET_USER_LIST, GET_USER_QUERY_INPUT } from '../../services/user';
import UserSearch from './UserSearch';
import queryFilter from '../../common/queryFilter';
import { enableMap } from '../../common/fieldMap';
import { filterQuery } from '../../utils/apolloHandler';
import { mapToFilters, convertToOrder } from '../../utils/dataMapping';

const { Column } = Table;

/**
 * 用户管理
 */
export default class UserManage extends React.Component {

  render() {
    return (
      <Query query={GET_USER_QUERY_INPUT}>
        {({ data: { userQueryInput }, client }) => (
          <Query query={GET_USER_LIST} variables={{ input: filterQuery(userQueryInput) }}>
            {queryFilter(({ data, loading }) => (
              <div>
                <UserSearch client={client} userQueryInput={userQueryInput} />
                <Table
                  loading={loading}
                  dataSource={data.userList.rows}
                  pagination={{
                    pageSize: userQueryInput.size,
                    current: userQueryInput.page,
                    total: data.userList.count,
                  }}
                  rowKey="id"
                  onChange={(pagination, filters, sorter) => {
                    client.writeData({
                      data: {
                        userQueryInput: {
                          ...userQueryInput,
                          ...filters,
                          order: convertToOrder(sorter),
                          page: pagination.current,
                          size: pagination.pageSize,
                        },
                      },
                    });
                  }}
                  bordered
                >
                  <Column title="用户名" dataIndex="username" />
                  <Column title="邮箱" dataIndex="email" />
                  <Column title="手机" dataIndex="mobile" />
                  <Column title="昵称" dataIndex="nickname" />
                  <Column
                    title="启用状态"
                    dataIndex="enable"
                    filters={mapToFilters(enableMap)}
                    filterMultiple={false}
                    render={text => enableMap[text]}
                  />
                  <Column
                    title="角色"
                    dataIndex="roles"
                    render={text => text.map(n => n.name).join(',')}
                  />
                  <Column
                    title="创建日期"
                    dataIndex="createdAt"
                    sorter
                    render={time => DateTime.fromMillis(time).toISODate()}
                  />
                  <Column
                    title="更新日期"
                    dataIndex="updatedAt"
                    sorter
                    render={time => DateTime.fromMillis(time).toISODate()}
                  />
                  <Column
                    title="操作"
                    key="operate"
                    render={() => (
                      <Fragment>
                        <Icon type="edit" title="修改" />
                        <Icon type="delete" title="删除" />
                      </Fragment>
                    )}
                  />
                </Table>
              </div>
            ))}
          </Query>
        )}
      </Query>
    );
  }
}
