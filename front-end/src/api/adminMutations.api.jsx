import { gql, useMutation } from '@apollo/client';


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
   
}

export default new AdminMutations();