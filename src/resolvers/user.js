import { defaultPageSize } from '../config';

/**
 * 默认用户管理查询条件
 */
export const defaultQueryInput = {
  __typename: 'UserQueryInput',
  page: 1,
  size: defaultPageSize,
  order: [],
  username: '',
  email: '',
  mobile: '',
  enable: null,
  roleIds: [],
};

export default {
  defaults: {
    userQueryInput: defaultQueryInput,
  },
};
