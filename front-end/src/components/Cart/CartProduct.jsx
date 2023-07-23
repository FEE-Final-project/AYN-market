import React, { useState } from 'react';

import { useUserMutations } from '../../hooks/useUserMutations';


import toy from '../../assets/toy.jpg'


import 'remixicon/fonts/remixicon.css'

import SpinnerComponent from '../LoadingComponent/SpinnerComponent';

export default function CartProduct({item}) {

const [loading, setLoading] = useState(false);
const [loadingReduce, setLoadingReduce] = useState(false);
const [loadingRemove, setLoadingRemove] = useState(false);

const { addToCartApi } = useUserMutations();
const { reduceQuantityOfCartItemApi } = useUserMutations();
const { removeFromCartItemApi } = useUserMutations();

const handleAddToCart = async (productId) => {
        setLoading(true);
        const input = { productId, quantity: 1 }
        await addToCartApi(input)
        setLoading(false);
      }
      

const handleReduceQuantityOfCartItem = async (cartItemId) => {
        setLoadingReduce(true);
        await reduceQuantityOfCartItemApi({cartItemId})
        setLoadingReduce(false);
        }

const handleRemoveFromCartItem = async (cartItemId) => {
        setLoadingRemove(true);
        await removeFromCartItemApi({cartItemId})
        setLoadingRemove(false);
        }

  return (
    <div  className="flex justify-around items-center py-2 border-b-gray-300">
    <div className='w-5/12 flex flex-col items-center'>
    <div className='flex items-start'>
      <img className='w-20 h-20 rounded mr-2' src={
            item.product.image
              ?"http://localhost:8000/" +
                item.product.image
              : toy
          } alt="product image" />
      <h3 className="text-md font-medium text-gray-700">{item.product.productName}</h3>                   
    </div>
    <button
        className=" p-1 mt-2  text-gray-700 rounded-md hover:bg-red-300"
        onClick={() => handleRemoveFromCartItem(item.id)}
      >
        {loadingRemove ? <SpinnerComponent/> :   
        <>
        <i className="ri-delete-bin-2-line mx-1"></i>
        Remove
        </>
        }
      </button>
    </div>
    <div className="flex flex-col items-center w-4/12 mb-3">
    <h4 className="text-md font-medium text-gray-700">$ {item.product.price}</h4>
    <div className=' flex mt-2 items-center justify-around w-64'>
    <button
        className="px-2 py-1 bg-gray-700 text-gray-300 rounded w-2/12 hover:bg-gray-500"
        onClick={() => handleReduceQuantityOfCartItem(item.id)}
      >
       {loadingReduce ? <SpinnerComponent/> : "-"}
      </button>
      <span className="font-medium text-gray-700 ">
        {item.quauntity}
      </span>

      <button
        className="px-2 py-1 bg-gray-700 text-gray-300 rounded w-2/12 hover:bg-gray-500"
        onClick={() => handleAddToCart(item.product.id)}
      >
        {loading ? <SpinnerComponent/> : "+"}
       
      </button>
      </div>
    </div>
  </div>
  )
}
