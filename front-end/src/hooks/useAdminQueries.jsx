import { useQuery } from "@apollo/client";

import AdminQueries from '../api/adminQueries.api';

export const useFetchCategoriesApi = (first,last,after,before) => {
    const {data , loading ,error , refetch:reloadCategories , fetchMore } = useQuery(AdminQueries.fetchCategories(),{variables:{first:first,last:last,after:after,before:before},errorPolicy:'all',fetchPolicy: 'network-only'})
   
    return {data , loading ,error ,reloadCategories , fetchMore}
}

export const useFetchProductsApi = ({first,last,after,before,search,category,priceGt,priceLt,price}) => {
    if(category === 'all') category = null

    if(priceLt === '') priceLt = null
    if(priceGt === '') priceGt = null
    if(price === '') price = null

    const {data , loading ,error , refetch:reloadProducts , fetchMore } = useQuery(AdminQueries.fetchProducts(),{variables:{first:first,last:last,after:after,before:before,search:search,category:category,priceGt:priceGt,priceLt:priceLt,price:price },errorPolicy:'all',fetchPolicy: 'network-only'})
   
    return {data , loading ,error ,reloadProducts , fetchMore}
}

export const useFetchOrdersApi = () => {
    const {data , loading ,error , refetch:reloadOrders , fetchMore } = useQuery(AdminQueries.fetchOrders(),{errorPolicy:'all',fetchPolicy: 'network-only'})
    return {data , loading ,error ,reloadOrders , fetchMore}
}


export const useFetchOrderApi = (id) => {
    const {data , loading ,error , refetch:reloadOrder , fetchMore } = useQuery(AdminQueries.fetchOrderDetails(),{variables:{"orderDetailsId": id},errorPolicy:'all',fetchPolicy: 'network-only'})
    return {data , loading ,error ,reloadOrder , fetchMore}
}
