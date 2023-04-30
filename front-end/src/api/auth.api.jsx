import { gql } from '@apollo/client';

class AuthAPI{

createUser() {
return gql`
mutation ($input:CustomerSignUpInput!) {
  customerSignup(input: $input) {
  success
  errors
  }
}
`;}

 
obtainToken() {
return  gql`
mutation ObtainToken($email: String!, $password: String!) {
  obtainToken(email: $email, password: $password) {
    errors
    success
    refreshToken
    token
    user {
      id
      email
      username
      isSuperuser
    }
  }
}
`;
}


refreshToken() {
    return gql`
      mutation refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
          token
          refreshToken
          payload
        }
     }`

};



}

export default new AuthAPI();