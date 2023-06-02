import { gql } from '@apollo/client';

class UserMutations {

  addToCart() {
    return gql`
    mutation ($input: AddToCartInput!) {
        addToCart(input: $input) {
          success
          errors
        }
      }
    `;
  }

  reduceQuantityOfCartItem() {
    return gql`
    mutation ($input: ReduceQuantityOfCartitemInput!) {
      reduceQuantityOfCartitem(input: $input) {
        errors
        success
      }
    }
   `;
  }
  
  removeFromCartItem() {
    return gql`
    mutation ($input: RemoveItemFromCartInput!) {
      removeFromCart(input: $input) {
        errors
        success
      }
    }
    `;
  }
  
}

export default new UserMutations();