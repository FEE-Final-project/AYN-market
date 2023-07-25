import React,{useState} from 'react'
import { useFetchWishlistApi } from '../hooks/useUserQueries';
import {useAuthContext} from '../hooks/useAuthContext'
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

import SpinnerComponent from '../components/LoadingComponent/SpinnerComponent';
import { useUserMutations } from '../hooks/useUserMutations';

import toast, { Toaster } from 'react-hot-toast';

export default function WishList() {
const {user} = useAuthContext()
const {data,loading:loadingWishlist,error,reloadWishlist} = useFetchWishlistApi(user.id);

const {removeFromWishListApi} = useUserMutations();

const [loading, setLoading] = useState(false);

const removeFromWishList = async (productId) => {
    setLoading(true);
    const input = { productId }
      const res = await removeFromWishListApi(input)
      if(res.data.removeFromWishList.success){
        toast.success("Product removed from wishlist");
        reloadWishlist()
      }
      else{
        toast.error("Product not removed from wishlist");
      }
    
    setLoading(false);
  }

if(loadingWishlist){
    return <LoadingComponent />
}

  return (
  <main className='w-9/12 mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-4'>{user.username} WishList <i className="ri-star-fill text-xl text-yellow-300"></i> </h1>
    {data?.customerDetails?.wishList.length === 0 && <h1 className='text-3xl rounded p-2 text-red-200 bg-red-500 w-9/12 mx-auto text-center'>No Products added in Wishlist</h1>}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20 '>
    {data?.customerDetails?.wishList.map((product)=>(
        <div key={product.id} className='bg-gray-200 shadow-md relative rounded p-10'>
            <div className='flex justify-center'>
                <img src={
            product.image
              ?"http://localhost:8000" + product.image
              : 'https://via.placeholder.com/150'
          }  alt={product.name} className='w-40 h-40 object-contain'/>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-lg font-semibold'>{product.productName}</p>
                <p className='text-sm text-gray-500'>{product.category.categoryName}</p>
                <p className='text-lg font-semibold'>${product.price}</p>
            </div>
            
            <button className='absolute right-1 top-1 bg-red-500 hover:bg-red-400 rounded p-1' onClick={()=>{removeFromWishList(product.id)}}>
            {loading ? <SpinnerComponent /> : <i className="ri-delete-bin-line text-white"></i>}
            </button>
        </div>
    ))}
    </div>
 <Toaster
    position="top-center"
    reverseOrder={false}
    />
 </main>
  )
}
