import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { FiPackage, FiMessageCircle, FiMapPin, FiEdit, FiLock } from 'react-icons/fi';

import './pages.css';

export default function Profile() {
  const { user } = useAuthContext();

  return (
      <div className="container mx-auto px-8">
        <div className="welcome-container text-right py-2">
          <span className="text-2xl font-bold mb-4">{`Welcome, ${user?.username}!`}</span>
        </div>

        <div className='profile-options  mt-8 bg-white shadow-md p-6 rounded-md w-3/4 h-3/4 mx-auto mt-9 mb-9 ml-auto mr-auto'>

          <h2 className="text-2xl font-bold mb-4">Your Account</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            <div className="flex items-center   mt-8  text-lg   p-1 text-white-900 hover:bg-gray-900 space-x-2  mr-9">
              <FiPackage className='text-3xl text-white-500' />
              <Link to="/orders" className="text-white-800 transition-colors duration-300">Orders</Link>
            </div>
            <div className="flex items-center space-x-2    mt-8     text-lg   p-1 text-white-700 hover:bg-gray-900 mr-4">
              <i className="ri-heart-fill text-3xl text-white-500"></i>
              <Link to="/wishlist" className="text-white-800 transition-colors duration-300">Wishlist</Link>
            </div>
            
            <div className="flex items-center      mt-8         text-lg   p-1 text-white-900 hover:bg-gray-900 space-x-2 mr-6">
              <FiMapPin className="text-3xl text-white-500" />
              <Link to="/address" className="text-white-500  transition-colors duration-300">Address</Link>
            </div>
            <div className="flex items-center space-x-2  mt-8     text-lg   p-1 text-white-900 hover:bg-gray-900 ">
              <FiEdit className="text-3xl text-white-500" />
              <Link to="/change-username" className="text-white-800  transition-colors duration-300">Change Username</Link>
            </div>
            <div className="flex items-center space-x-2 text-lg   mt-8 p-1 text-white-900 hover:bg-gray-900    ">
              <FiLock className="text-3xl text-white-500"  />
              <Link to="/change-password" className="text-white-800  transition-colors duration-300">Change Password</Link>
            </div>
          </div>
        </div>
      </div>
  );
}
