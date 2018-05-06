import { defaultPageSize } from '../config';

export default {
  defaults: {
    userQueryInput: {
      __typename: 'UserQueryInput',
      page: 1,
      size: defaultPageSize,
      order: null,
      username: null,
      email: null,
      mobile: null,
      enable: null,
      roleIds: null,
    },
  },
};
