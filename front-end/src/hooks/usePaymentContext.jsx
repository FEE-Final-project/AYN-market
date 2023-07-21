import { PaymentContext } from "../Context/payment"

import { useContext } from "react"

export const usePaymentContext = () => {
  const contextPay = useContext(PaymentContext)
 
  if(!contextPay) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return contextPay
}