import React from 'react'


//import for styling
import logo from "../assets/logo.svg";
import "./pages.css"

export default function SignUp() {

  return (
    <>
   <div class="background">
   <span>🛍</span>
   <span>🎮</span>
   <span>🥋</span>
   <span>💻</span>
   <span>🛠</span>
   <span>📺</span>
   <span>👚</span>
   <span>📸</span>
   <span>💄</span>
   <span>👠</span>
   <span>🎒</span>
   <span>👒</span>
   <span>💍</span>
   <span>👗</span>
   <span>🧦</span>
   <span>🕶</span>
   <span>👖</span>
   <span>☂</span>
   <span>🍴</span>
</div>
      <div className="flex min-h-full items-center justify-center px-4 py-12 
      sm:px-6 lg:px-8 z-50 
      mt-20
      mb-28">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-20 w-auto bg-white rounded-full "
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Create new account
            </h2>
     
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px  shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block mb-3  bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  user name
                </label>
                <input
                  id="user-name"
                  name="user-name"
                  type="text"
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Write your Name "
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            <div>
                <label htmlFor="password" className="sr-only">
                 Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="relative block  bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset 
                  focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}