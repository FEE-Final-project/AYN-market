import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useFetchCartDetailsApi } from '../hooks/useUserQueries';


import { useAuthContext } from '../hooks/useAuthContext';


import 'remixicon/fonts/remixicon.css'

//import different components
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';
import CartProduct from '../components/Cart/CartProduct';
import EmptyCart from '../components/Cart/EmptyCart';


export default function Cart() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { data, loading: loadingProducts, error } = useFetchCartDetailsApi();
  
 

  useEffect(() => {
    if (!user || user.isSuperUser) {
      navigate('/')
    }
  }, [user]);

  if (loadingProducts) {
    return <LoadingComponent />;
  }

  if (error) {
    return <EmptyCart />
  }

  return (
    
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {data?.cartDetails.cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="bg-white shadow-md rounded-lg px-4 py-4">
              <h2 className="text-lg font-medium text-gray-700 text-center">Your Cart</h2>
              <div className="mt-4 [&>*:not(:last-child)]:border-b ">
                {data?.cartDetails.cartItems.map((item) => (
                  <CartProduct item={item} key={item.id}  />
                ))}
              </div>
              <hr></hr>
              <div className="mt-4 flex flex-row-reverse items-center">
                <h3 className='my-2  flex items-center mx-3'><span className='mx-0.5 priceFont text-xl'>{data?.cartDetails.totalAmount}</span> <i className="ri-money-dollar-box-line text-green-800 font-extrabold text-3xl"></i></h3>
                <h3 className="text-md font-medium text-gray-700">Total Amount</h3>

              </div>
            </div>
          )}

    {( data?.cartDetails.cartItems.length > 0 && ! JSON.parse(localStorage.getItem('toggleOrderForm'))) &&    <div className='flex items-center justify-center mt-7'>
        <button className='bg-green-600 p-3 rounded w-3/12 text-white hover:bg-green-500' onClick={()=>{
          navigate("/checkOut")}
          }>Proceed to check out</button>
        </div>}

    {JSON.parse(localStorage.getItem('toggleOrderForm')) && <div className='flex items-center justify-center mt-7'>
        <button className='bg-green-600 p-3 rounded w-3/12 text-white hover:bg-green-500 mr-2' onClick={()=>{
          navigate("/checkOut")}
          }>Purchase not purchased order </button>
          <h1 className='mr-2' >OR</h1>
          <button className='bg-red-600 p-3 rounded w-3/12 text-white hover:bg-red-500' onClick={()=>{
           localStorage.clear()
           navigate("/cart")
         }
          }>Delete not purchased order</button>
          
        </div>}
        </div>
      </div>
    </div>
    
  );
}
