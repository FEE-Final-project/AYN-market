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
  
  createOrder(){
    return gql`
    mutation CreateOrder($input: CreateOrderInput!) {
      createOrder(input: $input) {
        success
        errors
        order {
          id
          orderTotal
          status
        }
      }
    }
    `
  }

  payOrder(){
    return gql`
    mutation Checkout($orderId: ID) {
      checkout(orderId: $orderId) {
        paymentRedirectUrl
        success
      }
    }
    `
  }
}

export default new UserMutations();