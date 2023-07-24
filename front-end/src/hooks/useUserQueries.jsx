import { useQuery } from "@apollo/client";

import UserQueries from "../api/userQueries.api";


export const useFetchCartDetailsApi = () => {
    const {data , loading ,error , refetch:reloadCartDetails} = useQuery(UserQueries.fetchCartDetails(),{errorPolicy:'all',fetchPolicy: 'network-only'})
    return {data , loading ,error ,reloadCartDetails }  
}

export const useFetchWishlistApi = (userId) => {
   
    const {data , loading ,error , refetch:reloadWishlist} = useQuery(UserQueries.fetchWishlist(),{variables:{"customerDetailsId":userId},errorPolicy:'all',fetchPolicy: 'network-only'})
    return {data , loading ,error ,reloadWishlist }  
}


export const useFetchCustomerOrdersApi = (userId) => {
    const {data , loading ,error , refetch:reloadCustomerOrders} = useQuery(UserQueries.fetchOrderList(),{variables:{"customerDetailsId":userId},errorPolicy:'all',fetchPolicy: 'network-only'})
    return {data , loading ,error ,reloadCustomerOrders }  
}

