import React, { useEffect } from 'react'
import { useFetchCartDetailsApi } from '../hooks/useUserQueries';
import CreateOrder from '../components/CheckOut/CreateOrder';

import { useNavigate } from 'react-router-dom';

//import for styling
import "./pages.css"


export default function CheckOut() {
  const { data} = useFetchCartDetailsApi();
  const navigate = useNavigate();

  useEffect(() => {
    if(data?.cartDetails.cartItems.length === 0 && !localStorage.getItem("toggleOrderForm")){
        navigate("/cart")
    }
    }, [data?.cartDetails.cartItems.length]);

  return (
    <section className='flex flex-col items-center justify-center'>
     <CreateOrder />
    </section>
  )

}
