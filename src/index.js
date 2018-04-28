import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:7001/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

const WrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(WrappedApp, document.getElementById('root'));
