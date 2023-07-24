import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import {useFetchCustomerOrdersApi} from '../hooks/useUserQueries'
import LoadingComponent from "../components/LoadingComponent/LoadingComponent"
import Payment from '../components/CheckOut/Payment'

export default function CustomerOrders() {
  const {user} = useAuthContext()
  
  const {data , loading ,error ,reloadCustomerOrders } = useFetchCustomerOrdersApi(user.id)
  
  
  if(loading){
    return <LoadingComponent/>
  }
  
  return (
    <main className='my-20'>
    <header className='text-3xl text-gray-800 font-bold text-center'>{user.username}'s orders</header>
    <table className='border-separate border-spacing-2 table-auto w-full my-10'>
    <thead>
                <tr>
                  <th className='text-lg font-bold text-gray-800'>Order Number</th>
                  <th className='text-lg font-bold text-gray-800'>Shipping Address</th>
                  <th className='text-lg font-bold text-gray-800'>Order Total</th>
                  <th className='text-lg font-bold text-gray-800'>Order Status</th>
                </tr>
    </thead>
    <tbody>
    {
       data?.customerDetails?.orderSet?.edges.map(({node})=>{
         return(
                <tr>
                  <td className='text-lg  text-center text-gray-800'>{node.orderNumber}</td>
                  <td className='text-lg p-5  text-center text-gray-800'>{node.addressLine1}</td>
                  <td className='text-lg p-5 text-center text-gray-800'>{node.orderTotal} USD </td>
                  <td className={node.status==="NEW" ? "text-lg mb-1 p-5 text-center text-white rounded bg-red-500" : "text-lg bg-green-500 p-5 text-center rounded text-white"}>{node.status==="NEW" ?
                   <Payment orderId={node.id}/>
                   : 
                  "paid"}
                   </td>

                </tr> 
         )
      })
    }
  </tbody>
  </table>
    </main>
    
  )
}
