import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
 margin: 20px;
`;

export const ARTICLE_LIST_QUERY = gql`
  query GetArticleList {
    articleList {
      rows {
        id
        type
        sort
        name
        title
        content
        status
      }
    }
  }
`;

class App extends React.Component {
  render() {
    return (
      <Container className="app">
        <Button type="primary">hello world</Button>
        <Query query={ARTICLE_LIST_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading</div>;
            }
            if (error) {
              return <h1>ERROR</h1>;
            }
            return (
              <div>
                {data.articleList.rows.map(item => (
                  <div key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.title}</span>
                    <span>{item.content}</span>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default App;
