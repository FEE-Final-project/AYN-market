import { useQuery } from "@apollo/client";

import AdminQueries from '../api/adminQueries.api';

export const useFetchCategoriesApi = (first,last,after,before) => {
    const {data , loading ,error , refetch:reloadCategories } = useQuery(AdminQueries.fetchCategories(),{variables:{first:first,last:last,after:after,before:before},errorPolicy:'all'})
   
    return {data , loading ,error ,reloadCategories}
}