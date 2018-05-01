import { gql } from 'apollo-boost';

export const LOGIN = gql`
  query login($username: String! $password: String!) {
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
  query logout {
    logout {
      result
    }
  }
`;
