import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($username: String! $password: String!) {
    login(username: $username password: $password) {
      id
      username
      email
      mobile
      nickname
      avatar
      introduction
      createdAt
      updatedAt
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      result
    }
  }
`;

export const GET_USER_QUERY_INPUT = gql`
  query getUserQueryInput {
    userQueryInput @client {
      page
      size
      username
      email
      mobile
      enable
      roleIds
      order
    }
  }
`;

export const GET_USER_LIST = gql`
  query getUserList($input: UserQueryInput) {
    userList(input: $input) {
      rows {
        id
        username
        email
        mobile
        enable
        isActive
        nickname
        avatar
        introduction
        roles {
          id
          name
          sort
        }
        createdAt
        updatedAt
      }
      count
    }
  }
`;
