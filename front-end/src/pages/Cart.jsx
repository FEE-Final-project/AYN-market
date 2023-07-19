import React, {useEffect} from 'react';

import { useNavigate } from 'react-router-dom';
import { useFetchCartDetailsApi } from '../hooks/useUserQueries';

import { useAuthContext } from '../hooks/useAuthContext';


//import different components
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';
import CartProduct from '../components/Cart/CartProduct';
import EmptyCart from '../components/Cart/EmptyCart';

export default function Cart() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
 
  const { data, loading:loadingProducts, error,reloadCartDetails } = useFetchCartDetailsApi();

  useEffect(() => {
  if(!user || user.isSuperUser){
    navigate('/')
  }
  }, [user]);

  if (loadingProducts) {
    return <LoadingComponent/>;
  }

  if(error){
    return <EmptyCart/>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {data?.cartDetails.cartItems.length === 0 ? (
            <EmptyCart/>
          ) : (
            <div className="bg-white shadow-md rounded-lg px-4 py-4">
              <h2 className="text-lg font-medium text-gray-700 text-center">Your Cart</h2>
              <div className="mt-4 [&>*:not(:last-child)]:border-b ">
                {data?.cartDetails.cartItems.map((item) => (
                  <CartProduct item={item} key={item.id} reloadCartDetails={reloadCartDetails}/>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
