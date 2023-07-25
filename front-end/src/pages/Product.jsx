import React,{useState} from 'react'

import {useParams} from 'react-router-dom'
import { useUserMutations } from '../hooks/useUserMutations';
import {useFetchProductDetailsApi} from "../hooks/useUserQueries"

import LoadingComponent from "../components/LoadingComponent/LoadingComponent"
import toast , {Toaster} from "react-hot-toast"

import "./pages.css"

export default function Product() {
  
  const {id} = useParams()
  const {data , loading:loadingProductDetails , error } = useFetchProductDetailsApi(id)
  const [show, setShow] = useState(false);
  const [loading,setLoading] = useState(false);

  const { addToCartApi } = useUserMutations();
  
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

  if(loadingProductDetails){
    return <LoadingComponent />
  }
 
  
  return (
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
          <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
              {data?.productDetails?.image !== null &&  <img className="w-full rounded mb-5" src={`http://localhost:8000${data?.productDetails.image}`} /> }
              {
                data?.productDetails?.images?.length > 0 ?
                data?.productDetails?.images?.map(({image})=>
                  <img className="w-full rounded mb-5" src={`http://localhost:8000${image}`} />
                 )
                 :
                 ""
              }
          </div>
       
          <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
              <div className="border-b border-gray-200 pb-6">
              <h1
                      className="
            lg:text-2xl
            text-xl
            font-semibold
            lg:leading-6
            leading-7
            text-gray-800
            my-2
          "
                  >
                     {data?.productDetails?.productName}
                  </h1>
                  <p className="text-sm leading-none text-gray-600">{data?.productDetails?.category?.categoryName}</p>
                  <p className="text-lg mt-5 leading-none text-gray-600">{data?.productDetails?.price} USD</p>
              </div>
             
              <button
                  className="
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
          text-base
          flex
          items-center
          justify-center
          leading-none
          text-white
          bg-green-800
          w-full
          py-4
          hover:bg-green-700
        "
         onClick={()=>handleAddToCart(data.productDetails.id)}
              >
                  {loading ?" Adding product to cart ..." : "Add To Cart"}
        </button>
        <p className="text-lg mt-5 leading-none text-gray-600">In Stock : {data?.productDetails?.stock}</p>
              <div>
                  <div className="border-t border-b py-4 mt-7 border-gray-200">
                      <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
                          <p className="text-base leading-4 text-gray-800">Description</p>
                          <button
                              className="
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                rounded
              "
                              aria-label="show or hide"
                          >
                              <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                          </button>
                      </div>
                      <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                     {data?.productDetails?.description}
                      </div>
                  </div>
              </div>
              
          </div>
          <Toaster
             position="top-center"
             reverseOrder={false}
            />
      </div>
  );
}
