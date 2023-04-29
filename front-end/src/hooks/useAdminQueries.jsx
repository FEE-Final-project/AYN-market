import { useQuery } from "@apollo/client";

import AdminQueries from '../api/adminQueries.api';

export const useFetchCategoriesApi = (first,last,after,before) => {
    const {data , loading ,error , refetch:reloadCategories , fetchMore } = useQuery(AdminQueries.fetchCategories(),{variables:{first:first,last:last,after:after,before:before},errorPolicy:'all',fetchPolicy: 'network-only'})
   
    return {data , loading ,error ,reloadCategories , fetchMore}
}