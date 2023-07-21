import React from 'react'
import completeMark from "../../assets/completeMark.png"
import Payment from './Payment'

export default function OrderInfo({order}) {

  return (
 
    <div className='flex  items-center justify-around mt-40 mb-20  mx-auto'>
        <aside className='w-1/12 border-r-2 border-green-800'>
          <img src={completeMark} alt="" />
        </aside>
        <main className='w-10/12 bg-yellow-900 text-white font-mono rounded py-7' >
            <h1 className='text-center bg-yellow-500 w-32 mx-auto p-3 rounded'>Order Info</h1>
                <div className='flex justify-around'>
                <div className='flex flex-col'>
                <p className='mt-2'>Order Number</p>
                <p className='mt-2'>Phone Number</p>
                <p className='mt-2'>Order Main address</p>
                {order.addressLine2 &&<p className='mt-2'>Order Alternative address</p>}
                <p className='mt-2'>Order Total</p>
                </div>
                <div className='flex flex-col'>
                <p className='mt-2'>{order.orderNumber}</p>
                <p className='mt-2'>{order.phoneNumber}</p>
                <p className='mt-2'>{order.addressLine1}</p>
                {order.addressLine2 &&<p className='mt-2'>{order.addressLine2}</p>}
                <p className='mt-2' >{order.orderTotal} USD </p>
                </div>
                </div>
                <Payment orderId={order.id} />
        </main>
    </div>
   
  
  )
}
