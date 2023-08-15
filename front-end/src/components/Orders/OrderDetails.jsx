import React from 'react'
import { useParams } from 'react-router-dom'

import { useFetchOrderApi  } from '../../hooks/useAdminQueries';
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {useNavigate} from 'react-router-dom'

export default function OrderDetails() {
 const {id} = useParams()
 const {data , loading ,error ,reloadOrders } = useFetchOrderApi(id)

 const navigate = useNavigate()

    if(loading){
        return <LoadingComponent/>
    }
    
  return (
    <main className='my-20'>
    <header className='text-center text-gray-800 font-bold text-3xl'>Order Number : {data.orderDetails.orderNumber}</header>
    <section className='my-10'>
    <header className='text-center text-gray-800 font-bold text-2xl'>Shipping Address</header>
    <div className='flex flex-col items-center'>
    <div className='my-5'>
    <span className='text-lg text-gray-800 font-bold'>First Name : </span>
    <span className='text-lg text-gray-800'>{data.orderDetails.firstName}</span>
    </div>
    <div className='my-5'>
    <span className='text-lg text-gray-800 font-bold'>Last Name : </span>
    <span className='text-lg text-gray-800'>{data.orderDetails.lastName}</span>
    </div>
    <div className='my-5'>
    <span className='text-lg text-gray-800 font-bold'>Email : </span>
    <span className='text-lg text-gray-800'>{data.orderDetails.email}</span>
    </div>
    <div className='my-5'>
    <span className='text-lg text-gray-800 font-bold'>Phone Number : </span>
    <span className='text-lg text-gray-800'>{data.orderDetails.phoneNumber}</span>
    </div>
    <div className='my-5'>
    <span className='text-lg text-gray-800 font-bold'>Address Line 1 : </span>
    <span className='text-lg text-gray-800'>{data.orderDetails.addressLine1}</span>
    </div>
{ data.orderDetails.addressLine2 &&   <div className='my-5'>
    <span className='text-lg text-gray-800 font-bold'>Address Line 2 : </span>
    <span className='text-lg text-gray-800'>{data.orderDetails.addressLine2}</span>
    </div>}
 { data.orderDetails.orderNote &&  <div className='my-5'>
    <span className='text-lg text-gray-800 font-bold'>Order Note : </span>
    <span className='text-lg text-gray-800'>{data.orderDetails.orderNote}</span>
    </div>}
    <div className='my-5'>
    <span className='text-lg text-gray-800 font-bold'>Order Total : </span>
    <span className='text-lg text-gray-800'>{data.orderDetails.orderTotal} USD</span>
    </div>
    </div>
    </section>
    <section className='my-20 mx-auto'>
    <header className='text-center text-gray-800 font-bold text-2xl'>Order Details</header>
    <table className='border-separate border-spacing-2 table-auto w-10/12 my-10 mx-auto '>
    <thead>
                <tr>
                    <th className='text-lg font-bold text-gray-800'>Product Image</th>
                    <th className='text-lg font-bold text-gray-800'>Product Name</th>
                    <th className='text-lg font-bold text-gray-800'>Product Price</th>
                    <th className='text-lg font-bold text-gray-800'>Quantity</th>
                    <th className='text-lg font-bold text-gray-800'>Total Price</th>
                </tr>
    </thead>
    <tbody>
    {
         data?.orderDetails?.orderproductSet?.edges.map(({node})=>{
              return(
                    <tr className="cursor-pointer" onClick={()=>{navigate(`/product/${node.product.id}`)}}>
                      <td className='w-20'><img src={
                        node.product.image
                        ?"http://localhost:8000" + node.product.image
                        : 'https://via.placeholder.com/150'
                        } alt="" srcset="" /></td>
                      <td className='text-lg  text-center text-gray-800'>{node.product.productName}</td>
                      <td className='text-lg p-5  text-center text-gray-800'>{node.productPrice} USD</td>
                      <td className='text-lg p-5 text-center text-gray-800'>{node.quantity}</td>
                      <td className='text-lg p-5 text-center text-gray-800'>{node.productPrice * node.quantity} USD</td>
                    </tr> 
              )
            }
            )
    }
    </tbody>
    </table>
    </section>
    </main>
  )
}
