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
            firstName
            addressLine1
            addressLine2
            email
            id
            lastName
            orderNumber
            orderTotal
            phoneNumber
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

  addToWishList(){
    return gql`
    mutation AddToWishList($input: AddToWishListInput!) {
      addToWishList(input: $input) {
        success
        errors
      }
    }    
    `
  }

  removeFromWishList(){
    return gql`
    mutation RemoveFromWishList($input: RemoveFromWishListInput!) {
      removeFromWishList(input: $input) {
        errors
        success
      }
    }
    `
  }
  
}

export default new UserMutations();