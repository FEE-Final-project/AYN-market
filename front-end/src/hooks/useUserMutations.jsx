import { useMutation } from "@apollo/client";
// import {useNavigate} from 'react-router-dom'
import UserMutations from "../api/userMutations.api";
// import { useAuthContext } from "./useAuthContext";

export const useUserMutations = () => {
  
    const [addToCart] = useMutation(UserMutations.addToCart(),{
        refetchQueries:['cartDetails'],
    });
  
    const [reduceQuantityOfCartItem] = useMutation(UserMutations.reduceQuantityOfCartItem(),{
        refetchQueries: ['cartDetails'],
    });

    const [removeFromCartItem] = useMutation(UserMutations.removeFromCartItem(),{
        refetchQueries: ['cartDetails'],
    });
    
    const [createOrder] = useMutation(UserMutations.createOrder(),{
        refetchQueries: ['orderDetails'],
    });
    
    const [payOrder] = useMutation(UserMutations.payOrder());

    const addToCartApi = async (input)=>{
         const res = await addToCart({ variables: { input } });
         return res;
    }

    const reduceQuantityOfCartItemApi = async (input)=>{
        const res = await reduceQuantityOfCartItem({ variables: { input } });
        return res;
    }
    
    const removeFromCartItemApi = async (input)=>{
        const res = await removeFromCartItem({ variables: { input } });
        return res;
    }

    const createOrderApi = async (input)=>{
        const res = await createOrder({ variables: { input } });
        return res;
    }
    
    const payOrderApi = async (orderId)=>{
        const res = await payOrder({ variables: { orderId } });
        return res;
    }
    return{
        addToCartApi,
        reduceQuantityOfCartItemApi,
        removeFromCartItemApi,
        createOrderApi,
        payOrderApi,
    }
}