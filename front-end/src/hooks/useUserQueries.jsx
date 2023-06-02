import { useQuery } from "@apollo/client";

import UserQueries from "../api/userQueries.api";


export const useFetchCartDetailsApi = () => {
    const {data , loading ,error , refetch:reloadCartDetails} = useQuery(UserQueries.fetchCartDetails(),{errorPolicy:'all',fetchPolicy: 'network-only'})
    return {data , loading ,error ,reloadCartDetails }
}