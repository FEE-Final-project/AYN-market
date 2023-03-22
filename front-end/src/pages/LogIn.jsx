import React from 'react'

export default function LogIn() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-5">
            
            <span className="text-gray-800 font-bold text-2xl">AYN</span>
          </div>
          <form className="mt-10" method="POST">
            <div className="mt-5 relative">
              <input type="email" name="email" id="email" className="h-14 px-5 w-full border-2 rounded-lg text-lg focus:outline-none focus:ring-2 ring-blue-600" placeholder="Email" />
            </div>
            <div className="mt-5 relative">
              <input type="password" name="password" id="password" className="h-14 px-5 w-full border-2 rounded-lg text-lg focus:outline-none focus:ring-2 ring-blue-600" placeholder="Password" />
            </div>
            <button type="submit" className="mt-5 text-lg font-semibold bg-blue-600 text-white w-full rounded-lg hover:bg-blue-700 transition-all duration-300 py-3">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
  
}