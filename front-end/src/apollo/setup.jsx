import {ApolloClient, InMemoryCache,  fromPromise ,gql , createHttpLink} from "@apollo/client";
import { onError } from '@apollo/client/link/error'
import { setContext } from "@apollo/client/link/context";

import AuthAPI from '../api/auth.api';
import TokenStorage from '../services/TokenStorage.service';

  
const errorLink = onError( ({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
      const messages = graphQLErrors.map(({ message }) => message);
      
      if (messages.includes('Signature has expired') || messages.includes('Error decoding signature')) {
          return getNewTokenByRefreshToken(TokenStorage.getRefreshToken())
              .filter(value => Boolean(value))
              .flatMap((newToken) => {
                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                      headers: {
                          ...oldHeaders,
                          authorization: `JWT ${newToken}`,
                      },
                  });
                  return forward(operation);
              });
      }
  }
})

const authLink = setContext((_, { headers }) => {
 
  return {
      headers: {
          ...headers,
          authorization:  TokenStorage.isAuthenticated() ?  TokenStorage.getAuthenticationHeader() : '',
      },
  };
});

const getNewTokenByRefreshToken = (refreshToken) => {
  return fromPromise(
      client
          .mutate({
              mutation: AuthAPI.refreshToken(),
              variables: { refreshToken },
          })
          .then((response) => {
              if (response?.data) {
                  const { token, refreshToken } = response.data.refreshToken;
                  if (token && refreshToken) {
                        TokenStorage.storeToken(token);
                        TokenStorage.storeRefreshToken(refreshToken);
                      return token;
                  }
              }
          })
          .catch((error) => {
              if (error.message === 'Invalid refresh token' || error.message === 'Refresh token is expired') {
                  TokenStorage.clearCookies();
                  window.location = window.location.origin;
              }
          })
  );
};


  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/',
  });
 
  //connect with server
  export const client = new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache()
  });