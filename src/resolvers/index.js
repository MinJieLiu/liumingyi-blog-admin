import merge from 'lodash/merge';

import profile from './profile';

const app = {
  defaults: {
    app: {
      __typename: 'App',
      siderFold: false, // 导航折叠
    },
  },
};

export default merge(app, profile);
