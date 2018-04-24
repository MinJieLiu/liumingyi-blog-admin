import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
      <div className="app">
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
                    <span>{item.content}</span>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
