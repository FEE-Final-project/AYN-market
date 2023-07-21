import React from 'react'

import { usePaymentContext } from '../hooks/usePaymentContext'
import {useUserMutations} from '../hooks/useUserMutations';

export default function Payment() {
  const {orderId} = usePaymentContext();
  const {payOrderApi} = useUserMutations();

  async function handlePayment(){
    try{
     const response = await payOrderApi(orderId);
        console.log(response)
        if(response.data.checkout.success){
            window.location.href = response.data.checkout.paymentRedirectUrl;
        }
    }
    catch(error){
        console.log(error)
    }
    }

  return (
    <div>
        <h1>PayPal payment</h1> 

        <button onClick={handlePayment}>Pay</button>
    </div>
  )
}
