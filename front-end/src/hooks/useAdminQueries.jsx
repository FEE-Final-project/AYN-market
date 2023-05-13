import { useQuery } from "@apollo/client";

import AdminQueries from '../api/adminQueries.api';

export const useFetchCategoriesApi = (first,last,after,before) => {
    const {data , loading ,error , refetch:reloadCategories , fetchMore } = useQuery(AdminQueries.fetchCategories(),{variables:{first:first,last:last,after:after,before:before},errorPolicy:'all',fetchPolicy: 'network-only'})
   
    return {data , loading ,error ,reloadCategories , fetchMore}
}

export const useFetchProductsApi = ({first,last,after,before,search,category}) => {
    if(category === 'all') category = null

    const {data , loading ,error , refetch:reloadProducts , fetchMore } = useQuery(AdminQueries.fetchProducts(),{variables:{first:first,last:last,after:after,before:before,search:search,category:category},errorPolicy:'all',fetchPolicy: 'network-only'})
   
    return {data , loading ,error ,reloadProducts , fetchMore}
}