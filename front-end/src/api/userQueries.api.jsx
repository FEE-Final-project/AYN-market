import { gql } from '@apollo/client';


class UserQueries{

    fetchCartDetails(){
        return gql`
        query{
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
   
   fetchOrderDetails(){
    
   }
 
   
}

export default new UserQueries();