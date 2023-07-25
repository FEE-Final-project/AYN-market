import React from 'react'
import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';

import { HiOutlineShoppingCart } from "react-icons/hi";

export default function EmptyCart() {
const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg px-4 pt-32 pb-24" >
    <div className="mt-4">
      <Fragment>
        <div className="flex flex-col items-center justify-center">
          <HiOutlineShoppingCart className="w-24 h-24 text-gray-500" />
          <p className="mt-4 text-center text-gray-600 text-lg">
            Your cart is empty!
          </p>
          <p className="mt-2 text-center text-gray-600">
            Browse our products and discover our best deals!
          </p>
        </div>
      </Fragment>
    </div>

    <div className="mt-8 flex justify-center">
      <button
        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-indigo-700"
        onClick={() => navigate('/')}
      >
        Start Shopping
      </button>
    </div>
  </div>
  )
}
