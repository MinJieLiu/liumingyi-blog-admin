import gql from 'graphql-tag';

export const GET_ROLE_FOR_SELECT = gql`
  query getRoleForSelect {
    roleList {
      rows {
        id
        name
      }
    }
  }
`;
