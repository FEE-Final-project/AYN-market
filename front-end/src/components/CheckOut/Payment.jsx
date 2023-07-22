import React from 'react'


import {useUserMutations} from '../../hooks/useUserMutations';

import payPal from "../../assets/paypal.png"

export default function Payment({orderId}) {

  const {payOrderApi} = useUserMutations();
  
  async function handlePayment(){
    try{
     const response = await payOrderApi(orderId);
        if(response.data.checkout.success){
            window.location.href = response.data.checkout.paymentRedirectUrl;
            
        }
    }
    catch(error){
        console.log(error)
    }
    }

  return (
<button onClick={handlePayment} className='bg-yellow-400 hover:bg-yellow-300 text-white flex rounded items-center justify-center w-2/12 mt-4 mx-auto'> <img className='w-10' src={payPal} alt="" /> <span>ay Now</span></button>

  )
}