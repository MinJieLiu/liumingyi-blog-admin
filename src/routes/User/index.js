import React, { Fragment } from 'react';
import { DateTime } from 'luxon';
import { Query, Mutation } from 'react-apollo';
import {
  Table,
  Icon,
  Popconfirm,
  message,
} from 'antd';
import {
  GET_USER_LIST,
  GET_USER_QUERY_INPUT,
  DELETE_USER,
} from '../../services/user';
import {
  EditWrap,
} from '../../components/MainForm';
import UserSearch from './UserSearch';
import FormModal from './FormModal';
import queryFilter from '../../common/queryFilter';
import { enableMap } from '../../common/fieldMap';
import {
  convertFilterToInt,
  convertToIntArr,
  filterQuery,
} from '../../utils/queryHelper';
import {
  convertToOrderArr,
  convertToSortValue,
  convertToServerPaging,
  convertToClientPaging,
  mapToFilters,
} from '../../utils/dataMapping';

const { Column } = Table;

/**
 * 用户管理
 */
export default class UserManage extends React.PureComponent {
  // 组装查询条件
  handleConvertToSearch = ({ enable, roleIds, ...queryInput }) => ({
    ...filterQuery(queryInput),
    enable: convertFilterToInt(enable),
    roleIds: convertToIntArr(roleIds),
  });

  // 删除
  handleDeleteItem = async (id, mutate, refetch) => {
    try {
      await mutate({ variables: { id } });
      message.success('操作成功');
      refetch();
    } catch (e) {
      message.error(e.message);
    }
  };

  render() {
    return (
      <Query query={GET_USER_QUERY_INPUT}>
        {({ data: { userQueryInput }, client }) => (
          <Query
            query={GET_USER_LIST}
            variables={{ input: this.handleConvertToSearch(userQueryInput) }}
            fetchPolicy="network-only"
          >
            {queryFilter(({ data: { userList }, loading, refetch }) => (
              <Fragment>
                <UserSearch client={client} userQueryInput={userQueryInput} />
                <Table
                  loading={loading}
                  dataSource={userList.rows}
                  pagination={{
                    ...convertToClientPaging(userQueryInput),
                    total: userList.count,
                  }}
                  rowKey="id"
                  onChange={(pagination, filters, sorter) => {
                    client.writeData({
                      data: {
                        userQueryInput: {
                          ...userQueryInput,
                          ...convertToServerPaging(pagination),
                          ...filters,
                          order: convertToOrderArr(sorter),
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
                    filteredValue={userQueryInput.enable}
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
                    sortOrder={convertToSortValue(userQueryInput.order, 'createdAt')}
                    render={time => DateTime.fromMillis(time).toISODate()}
                  />
                  <Column
                    title="更新日期"
                    dataIndex="updatedAt"
                    sorter
                    sortOrder={convertToSortValue(userQueryInput.order, 'updatedAt')}
                    render={time => DateTime.fromMillis(time).toISODate()}
                  />
                  <Column
                    title="操作"
                    key="operate"
                    render={(text, item) => (
                      <EditWrap>
                        <FormModal userItem={item}>
                          <Icon type="edit" title="修改" />
                        </FormModal>
                        <Mutation mutation={DELETE_USER}>
                          {mutate => (
                            <Popconfirm
                              title="确认删除？"
                              onConfirm={() =>
                                this.handleDeleteItem(item.id, mutate, refetch)}
                            >
                              <Icon type="delete" title="删除" />
                            </Popconfirm>
                          )}
                        </Mutation>
                      </EditWrap>
                    )}
                  />
                </Table>
              </Fragment>
            ))}
          </Query>
        )}
      </Query>
    );
  }
}
