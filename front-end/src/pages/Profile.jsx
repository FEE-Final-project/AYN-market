import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { FiPackage, FiMessageCircle, FiMapPin, FiEdit, FiLock } from 'react-icons/fi';

import './pages.css';

export default function Profile() {
  const { user } = useAuthContext();
  return (
    <div className="container mx-auto px-4">
      <div className="profile-header flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>
      <div className="profile-info bg-white shadow-md p-6 rounded-md mb-4">
        <div className="info-row mb-4">
          <label className="text-gray-700 font-bold">Username:</label>
          <span className="text-gray-800 ml-2">{user?.username}</span>
        </div>
        <div className="info-row mb-4">
          <label className="text-gray-700 font-bold">Email:</label>
          <span className="text-gray-800 ml-2">{user?.email}</span>
        </div>
      </div>
      <div className="profile-options bg-white shadow-md p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Your Account</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <FiPackage className="text-3xl text-gray-700" />
            <Link to="/orders" className="text-gray-800 hover:text-blue-500 transition-colors duration-300">Orders</Link>
          </div>
          <div className="flex items-center space-x-2">
            <FiMessageCircle className="text-3xl text-gray-700" />
            <Link to="/messages" className="text-gray-800 hover:text-blue-500 transition-colors duration-300">Messages</Link>
          </div>
          <div className="flex items-center space-x-2">
            <FiMapPin className="text-3xl text-gray-700" />
            <Link to="/address" className="text-gray-800 hover:text-blue-500 transition-colors duration-300">Address</Link>
          </div>
          <div className="flex items-center space-x-2">
            <FiEdit className="text-3xl text-gray-700" />
            <Link to="/change-username" className="text-gray-800 hover:text-blue-500 transition-colors duration-300">Change Username</Link>
          </div>
          <div className="flex items-center space-x-2">
            <FiLock className="text-3xl text-gray-700"  />
            <Link to="/change-password" className="text-gray-800 hover:text-blue-500 transition-colors duration-300" >Change Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
