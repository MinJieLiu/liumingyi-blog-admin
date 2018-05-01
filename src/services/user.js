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
