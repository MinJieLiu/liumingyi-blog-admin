import { gql } from 'apollo-boost';

export const GET_APP = gql`
  query getApp {
    app @client {
      MenuCollapsed
    }
  }
`;
