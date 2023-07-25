import React, { useEffect, useState } from 'react'
import { useAdminMutations } from '../../hooks/useAdminMutations';
import { useUserMutations } from '../../hooks/useUserMutations';
import toast, { Toaster } from 'react-hot-toast';

import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { useFetchWishlistApi } from '../../hooks/useUserQueries';

import {useAuthContext} from '../../hooks/useAuthContext'
import {useNavigate} from "react-router-dom"

import SpinnerComponent from '../LoadingComponent/SpinnerComponent';

import EditProductForm from './EditProductForm';
import toy from "../../assets/toy.jpg";

import 'remixicon/fonts/remixicon.css'


export default function ProductCard({ product, isCustomer }) {

  const {user} = useAuthContext()

  const navigate = useNavigate()
  const {data,loading:loadingWishlist,error,reloadWishlist} = useFetchWishlistApi(user.id);
  

  const [showEditForm, setShowEditForm] = useState("");
  const { deleteProductApi } = useAdminMutations();
  const { addToCartApi } = useUserMutations();
  const {addToWishListApi} = useUserMutations();
  const {removeFromWishListApi} = useUserMutations();

  const [loading, setLoading] = useState(false);
  
  const checkWishList = (id)=>{
    let index = data?.customerDetails.wishList.findIndex(ele=> ele.id === id)
    if(index > -1){
      return true
    }
    else{
      return false
    }
  }

  const toggleWishlist = async (productId) => {
    setLoading(true);
  
    const input = { productId }
    if(! checkWishList(productId)){

      const res = await addToWishListApi(input)
      if (res.data.addToWishList.success) {
        toast.success("Product added to wishlist");
      }
      else {
        toast.error("Product not added to wishlist");
      }
    }
    else{
      const res = await removeFromWishListApi(input)
      if(res.data.removeFromWishList.success){
        toast.success("Product removed from wishlist");
      }
      else{
        toast.error("Product not removed from wishlist");
      }
    }
    setLoading(false);
  }

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteProductApi({ id })
    setLoading(false);
  }

  const handleAddToCart = async (productId) => {
    setLoading(true);
  
    const input = { productId, quantity: 1 }
    const res = await addToCartApi(input)
    if (res.data.addToCart.success) {
      toast.success("Product added to cart");
   
    }
    else {
      toast.error("Product not added to cart");
    }
    setLoading(false);
  }

  if(loadingWishlist){
    return <LoadingComponent />
  }

  return (
    <>
      {showEditForm === product.id ?

        <EditProductForm node={product} setShowEditForm={setShowEditForm} />
        :
        <div className="relative  w-64 lg:w-3/12  mx-auto flex flex-col items-center shadow rounded lg:mx-2 my-5 bg-purple-400 cursor-pointer" >
        
          <img src={
            product.image
              ?"http://localhost:8000" + product.image
              : toy
          }  className='rounded w-full h-64' alt="product image" onClick={()=>navigate(`/product/${product.id}`)} />
          <hr className='bg-green-500 w-full h-0.5 mb-2' />
          <p className=' bg-gray-600 px-2 py-1 text-white rounded-full'>{product.category.categoryName}</p>
          <p className='my-2 font-extrabold'>{product.productName}</p>
          <p className='my-2  flex items-center'><span className='mx-0.5 priceFont text-xl'>{product.price}</span> <i className="ri-money-dollar-box-line text-green-800 font-extrabold text-3xl"></i></p>
          {
            isCustomer ? <>
              <Toaster
             position="top-center"
             reverseOrder={false}
            />
              <button className='bg-green-700 p-3 absolute right-0 bottom-0 text-white  rounded-bl rounded-br rounded-tr rounded-tl-2xl  hover:bg-green-500'
                onClick={() => handleAddToCart(product.id)}
              >
                {loading ? <SpinnerComponent /> : <i className="ri-shopping-cart-2-fill"></i>}
               
              </button>
              <button className='bg-yellow-600 p-3 absolute left-0 bottom-0 text-white  rounded-br rounded-bl rounded-tl rounded-tr-2xl  hover:bg-yellow-500' onClick={()=>toggleWishlist(product.id)}>

              {loading ? <SpinnerComponent /> : checkWishList(product.id) ? <i className="ri-star-fill"></i> : <i className="ri-star-line"></i>}
              
              </button>
            </>
              :
              <>
                <p className='my-2 font-extralight'>In Stock: {product.stock}</p>
                {/* delete button */}

                <button className='absolute left-1 top-1 bg-red-500 rounded p-1' onClick={() => handleDelete(product.id)}>
                  {loading ? <SpinnerComponent /> : <i className="ri-delete-bin-line text-white"></i>}
                </button>
                {/* edit button */}
                <button className='absolute right-1 top-1 bg-green-500 rounded p-1' onClick={() => setShowEditForm(product.id)}>
                  <i className="ri-edit-line text-white"></i>
                </button>
              </>
          }

        </div>
      }
    </>
  )
}


