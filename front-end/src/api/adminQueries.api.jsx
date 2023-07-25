import { gql } from '@apollo/client';


class AdminQueries {

  fetchCategories() {
    return gql`
        query CategoryList($first: Int, $last: Int , $after: String , $before: String)  {
            categoryList(first: $first,last:$last, after: $after, before: $before) {
              edges {
                node {
                  id
                  categoryName
                  description
                  image
                }
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              totalCount
            }
          }
    `
  }

  fetchProducts() {
    return gql`
      query ProductList($after: String, $before: String, $first: Int, $last: Int, $search: String, $category: String, $priceGt: Float, $priceLt: Float , $price: Float) {
        productList(after: $after, before: $before, first: $first, last: $last, search: $search, category: $category ,price_Gt: $priceGt, priceLt: $priceLt, price:$price) {
          edges {
            cursor
            node {
              category {
                categoryName
                id 
              }
              productName
              stock
              price
              description
              id
              image
              isAvailable
            }
          }
          pageInfo {
            hasNextPage
            startCursor
            endCursor
            hasPreviousPage
          }
          totalCount
        }
      }
      `
  }

  fetchOrders() {
    return gql`
      query OrderList {
  orderList {
    edges {
      node {
        addressLine1
        addressLine2
        email
        firstName
        id
        lastName
        orderNote
        orderNumber
        orderTotal
        phoneNumber
        status
      }
    }
  }
}`}

fetchOrderDetails() {
  return gql`
  query OrderDetails($orderDetailsId: ID!) {
    orderDetails(id: $orderDetailsId) {
      addressLine1
      addressLine2
      email
      firstName
      lastName
      orderNote
      orderNumber
      orderTotal
      phoneNumber
      status
      orderproductSet {
        edges {
          node {
            quantity
            product {
              productName
              id
              category {
                id
                categoryName
              }
              image
            }
            id
            productPrice
          }
        }
      }
    }
  }
  
  `
  }


}

export default new AdminQueries();

