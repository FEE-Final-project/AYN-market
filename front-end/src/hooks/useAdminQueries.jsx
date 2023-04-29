import { useQuery } from "@apollo/client";

import AdminQueries from '../api/adminQueries.api';

export const useFetchCategoriesApi = (first,after) => {
    const {data , loading ,error , refetch:reloadCategories } = useQuery(AdminQueries.fetchCategories(),{variables:{first:first,after:after},errorPolicy:'all',fetchPolicy: 'network-only'})
   
    return {data , loading ,error ,reloadCategories}
}