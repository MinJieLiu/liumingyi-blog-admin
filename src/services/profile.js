import { gql } from 'apollo-boost';

export const MY_PERMISSIONS = gql`
  query GetMyPermissions {
    profile @client {
      menus {
        id
        permission
      }
    }
  }
`;
