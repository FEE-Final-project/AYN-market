
import { createContext, useState , useEffect } from 'react'
import  TokenStorage from '../services/TokenStorage.service'
export const PaymentContext = createContext()


export const PaymentContextProvider = ({ children }) => {

const [cartId , setCartId] = useState(TokenStorage.getCartId())
const [orderId , setOrderId] = useState(TokenStorage.getOrderId())
  useEffect(()=>{
    const cartId = TokenStorage.getCartId()
    const orderId = TokenStorage.getOrderId()
    if(cartId){
        setCartId(cartId)
    }
    if(orderId){
        setOrderId(orderId)
    }
  },[])

  return (
    <PaymentContext.Provider value={{cartId,orderId}}>
      { children }
    </PaymentContext.Provider>
  )

}
