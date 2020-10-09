import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/lux/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
})

const WithApollo = () => (<ApolloProvider client={client} > <App /> </ApolloProvider>)

ReactDOM.render(
  <React.StrictMode>
    <WithApollo />
  </React.StrictMode>,
  document.getElementById('root')
);



serviceWorker.unregister();
