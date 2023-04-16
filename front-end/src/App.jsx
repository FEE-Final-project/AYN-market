import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Product from "./components/Product/Product";
import PrivateRoute from "./components/PrivateRoute";
import { ProductsContextProvider } from "./Context/ProductsContext";
import {ApolloProvider, ApolloClient, InMemoryCache,  fromPromise ,gql , createHttpLink} from "@apollo/client";
import { onError } from '@apollo/client/link/error'
import { setContext } from "@apollo/client/link/context";
import ProfileDirect from "./pages/ProfileDirect";
import Cart from "./pages/Cart";
import Cookies from "universal-cookie";


function App() {
const cookies = new Cookies();
  
const errorLink = onError( ({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
      const messages = graphQLErrors.map(({ message }) => message);
      const refreshToken = cookies.get("refreshToken");
      if (messages.includes('Signature has expired') || messages.includes('Error decoding signature')) {
          return getNewTokenByRefreshToken(refreshToken)
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
  const token = cookies.get("token");
  return {
      headers: {
          ...headers,
          authorization:  token ? `JWT ${token}` : '',
      },
  };
});

const getNewTokenByRefreshToken = (refreshToken) => {
  return fromPromise(
      client
          .mutate({
              mutation:gql`
              mutation refreshToken($refreshToken: String!) {
                refreshToken(refreshToken: $refreshToken) {
                  token
                  refreshToken
                  payload
                }
             }`,
              variables: { refreshToken },
          })
          .then((response) => {
              if (response?.data) {
                  const { token, refreshToken } = response.data.refreshToken;
                  if (token && refreshToken) {
                      cookies.set('token',token);
                      cookies.set('refreshToken',refreshToken);
                      return token;
                  }
              }
          })
          .catch((error) => {
              if (error.message === 'Invalid refresh token' || error.message === 'Refresh token is expired') {
                  cookies.remove('token');
                  cookies.remove('refreshToken');
                  window.location = window.location.origin;
              }
          })
  );
};


  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/',
  });
 
  //connect with server
  const client = new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
    <ProductsContextProvider>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfileDirect/>} />
      </Route>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/LogIn" element={<LogIn/>} />
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/product" element={<Product/>} />
    </Routes>
    <Footer />
  </BrowserRouter>
  </ProductsContextProvider>
  </ApolloProvider>
  )
  }
export default App
