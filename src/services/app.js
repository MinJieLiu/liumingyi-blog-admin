import gql from 'graphql-tag';

export const GET_APP = gql`
  query getApp {
    app @client {
      MenuCollapsed
    }
  }
`;
