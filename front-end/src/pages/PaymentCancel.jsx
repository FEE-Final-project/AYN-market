import React from 'react'

import unpurchased from "../assets/unpurchased.svg"

export default function PaymentSuccess() {
  return (
    <section className='bg-red-600 w-9/12 mx-auto relative my-40 p-60 rounded'>
    <h1 className='text-center text-white font-bold text-5xl mb-5'>Payment Failed</h1>
    <p className='text-center text-white font-bold text-2xl mb-10'>something went wrong try again later</p>
    <img src={unpurchased} alt="" className='w-4/12 absolute'/>
    </section>
  )
}