import { gql } from '@apollo/client';


class AdminQueries{

    fetchCategories(){
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

    fetchProducts(){
      return gql`
      query ProductList($after: String, $before: String, $first: Int, $last: Int, $search: String, $category: String) {
        productList(after: $after, before: $before, first: $first, last: $last, search: $search, category: $category) {
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
   
}

export default new AdminQueries();

