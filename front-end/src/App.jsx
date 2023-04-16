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
import { ApolloClient, InMemoryCache, ApolloProvider , createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ProfileDirect from "./pages/ProfileDirect";
import Cart from "./pages/Cart";
import Cookies from "universal-cookie";


function App() {
  const cookies = new Cookies();
  
  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/',
  });
 
  const authLink = new ApolloLink((operation, forward) => {
  
    const token = cookies.get("token");
    const refreshToken = cookies.get("refreshToken");
     operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : "",
        'x-refresh-token': refreshToken ? refreshToken : '',
      }
  }))
return forward(operation);
})

const refreshLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
     const context = operation.getContext();
     const { response: { headers } } = context;
     const token = headers.get('x-token');
     const refreshToken = headers.get('x-refresh-token');
     if(token && refreshToken){
      cookies.set('token',token);
      cookies.set('refreshToken',refreshToken);
     }
     return response;
    });
})

  //connect with server
  const client = new ApolloClient({
    link: refreshLink.concat(authLink).concat(httpLink),
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
