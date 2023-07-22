import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';


import { FiPackage, FiMapPin, FiEdit, FiLock } from 'react-icons/fi';
import 'remixicon/fonts/remixicon.css'

import './pages.css';

export default function Profile() {
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto px-8">
      <div className="welcome-container text-right py-2">
        <span className="text-2xl font-bold mb-4">{`Welcome, ${user?.username}!`}</span>
      </div>

      <div className='bg-gray-100 shadow-md p-6 rounded w-full mt-8 mb-9'>

        <h2 className="text-2xl font-bold mb-4">Your Account</h2>

        <div className="lg:flex lg:justify-around ">

          <Link className="flex items-center  rounded  text-lg   p-2 hover:text-white hover:bg-gray-900 space-x-2 lg:w-3/12" to={`/profile/orders/${user.id}`}>
            <FiPackage className='text-3xl ' />
            <span  className="transition-colors duration-300">Orders</span>
          </Link>

          <Link className="flex items-center rounded space-x-2        text-lg   p-2 hover:text-white hover:bg-gray-900 lg:w-3/12"  to="/wishlist" >
          <i className="ri-heart-line text-3xl"></i>
          <span className="transition-colors duration-300">Wishlist</span>
          </Link>

          <Link className="flex items-center rounded  text-lg   p-2  hover:text-white hover:bg-gray-900 space-x-2 lg:w-3/12" to="/address">
            <FiMapPin className="text-3xl" />
            <span  className="transition-colors duration-300">Address</span>
          </Link>


        </div>

          <div className='block  mt-4 ml-1 lg:flex lg:justify-around lg:items-center '>

          <Link className=" w-full flex items-center rounded space-x-2  text-lg p-2 hover:text-white hover:bg-gray-900 lg:w-2/12 lg:hover:w-3/12 "  to="/change-username" >
            <FiEdit className="text-3xl" />
            <span className=" transition-colors duration-300">Change Username</span>
          </Link>
         
          <Link className=" mt-3 w-full flex items-center rounded  space-x-2 text-lg  p-2 hover:text-white hover:bg-gray-900  lg:w-3/12 md:w-full" to="/change-password">
            <FiLock className="text-3xl " />
            <span  className=" transition-colors duration-300">Change Password</span>
          </Link>
          </div>

      </div>
    </div>
  );
}
