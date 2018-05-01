import { gql } from 'apollo-boost';

export const MY_PROFILE = gql`
  query GetMyProfile {
    profile {
      id
      username
      email
      mobile
      nickname
      avatar
      introduction
      createdAt
      updatedAt
      authorizations {
        id
        provider
      }
      roles {
        id
        name
        sort
        remarks
      }
      menus {
        id
        name
        type
        icon
        sort
        enable
        parentId
        pathname
        permission
      }
    }
  }
`;
