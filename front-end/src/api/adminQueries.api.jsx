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

// import React, { useState } from 'react';
// import { gql } from '@apollo/client';
// import { useQuery } from '@apollo/client';

// const GET_USERS = gql`
//   query getUsers($first: Int!, $after: String, $before: String) {
//     users(first: $first, after: $after, before: $before) {
//       edges {
//         node {
//           id
//           name
//           email
//         }
//         cursor
//       }
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//     }
//   }
// `;


// const PAGE_SIZE = 10;

// function UserSlider() {
//  
// }