import { gql } from 'apollo-boost';

export const MY_PERMISSIONS = gql`
  query GetMyPermissions {
    profile {
      id
      username
      email
      mobile
      nickname
      avatar
      introduction
      authorizations {
        id
        provider
      }
      roles {
        id
        name
        sort
      }
      menus {
        id
        permission
      }
    }
  }
`;
