import { gql } from '@apollo/client';

class AuthAPI {

  createUser() {
    return gql`
mutation ($input:CustomerSignUpInput!) {
  customerSignup(input: $input) {
  success
  errors
  }
}
`;
  }


  obtainToken() {
    return gql`
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
      phone
      isSuperuser
      wishList {
        id
        productName
        price
        image
      }
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

  emailConfirm() {
    return gql`
      mutation emailConfirm($input: EmailConfirmInput!) {
        emailConfirm(input: $input) {
          errors
          success
        }
      }`
  }

  resetPassword() {
    return gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
      resetPassword(input: $input) {
        success
      }
    }`
  }

  resetPasswordConfirm() {
    return gql`
    mutation ResetPasswordConfirm($input: ResetPasswordConfirmInput!) {
      resetPasswordConfirm(input: $input) {
        success
      }
    }`
  }

}

export default new AuthAPI();