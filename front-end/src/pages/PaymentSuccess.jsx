import React from 'react'

import deliver from "../assets/deliver.png"


export default function PaymentSuccess() {
    
    localStorage.clear()

  return (
    <section className='bg-green-400 w-9/12 mx-auto relative my-32 p-60 rounded'>
    <h1 className='text-center text-white font-bold text-5xl mb-5'>Payment Success</h1>
    <p className='text-center text-white font-bold text-2xl mb-10'>you purchase your order and it will be delivered soon</p>
    <img src={deliver} alt="" className='w-4/12 absolute'/>
    </section>
  
  )
}
