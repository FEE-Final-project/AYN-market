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

 
   
}

export default new UserQueries();