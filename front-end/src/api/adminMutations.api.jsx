import { gql } from '@apollo/client';


class AdminMutations{

    addCategory(){
        return gql`
        mutation($input: CreateCategoryInput!){
        createCategory(input: $input){
            errors
            success
            category{
                id
                categoryName
                description
                image
            }
        }
        }
    `
    }

    deleteCategory(){
        return gql`
          mutation($input: DeleteCategoryInput!){
            deleteCategory(input: $input){
                success
                errors
            }
          }
        `
    }

    updateCategory(){
        return gql`
        mutation ($input: UpdateCategoryInput!) {
            updateCategory(input: $input) {
              errors
              success
              category {
                categoryName
              }
            }
          }
          
        `
    }

    addProduct(){
      
      return gql`
      mutation($input: CreateProductInput!){
        createProduct(input: $input){
          errors
          success
          product{
            productName
            description
            images{
              id
              image
            }
            image
          }
        }
      }
      `
    }
   
    deleteProduct(){
      return gql`
      mutation ($input: DeleteProductInput!) {
        deleteProduct(input: $input) {
          success
          errors
        }
      }
      `
    }

    updateProduct(){
      return gql`
      mutation ($input: UpdateProductInput!) {
        updateProduct(input: $input) {
          success
          errors
        }
      }      
      `
    }
    
   
}

export default new AdminMutations();