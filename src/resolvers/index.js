import merge from 'lodash/merge';

import profile from './profile';
import user from './user';

const app = {
  defaults: {
    app: {
      __typename: 'App',
      MenuCollapsed: false, // 导航折叠
    },
  },
};

export default merge(
  app,
  profile,
  user,
);
