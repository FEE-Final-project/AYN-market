import { gql } from '@apollo/client';


class UserQueries{

    fetchCartDetails(){
        return gql`
        query CartDetails{
            cartDetails {
              cartId
              id
              totalAmount
              cartItems {
                quauntity
                product {
                  productName
                  price
                  image
                  id
                }
                id
              }
            }
          }
    `
    }

    fetchWishlist(){
      return gql`
      query CustomerDetails($customerDetailsId: ID!) {
        customerDetails(id: $customerDetailsId) {
          wishList {
            category {
              categoryName
              id
            }
            image
            price
            productName
            id
          }
        }
      }
      `
    }

    fetchOrderList(){
      return gql`
      query CustomerDetails($customerDetailsId: ID!) {
        customerDetails(id: $customerDetailsId) {
          orderSet {
            edges {
              node {
                firstName
                lastName
                status
                orderNumber
                payment {
                  amountPaid
                }
                addressLine1
                addressLine2
                orderTotal
                id
                isOrdered
              }
            }
          }
        }
      }
      
      `
    }
   

 
   
}

export default new UserQueries();