//import react utilities
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import Cookies from "universal-cookie";
import { useAuthContext } from "../../hooks/useAuthContext";
import { gql, useQuery } from '@apollo/client';
//import tailwind tags
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
//import styles and logo
import logo from "../../assets/logo.svg";
import "./Navbar.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let GET_USER = gql`
query Me($id: ID!) {
  me(id: $id) {
    isActive
    isAdmin
    role
  }
}

`;
export default function Navbar() {
  const cookies = new Cookies();
  const { user, dispatch} = useAuthContext();
  // const id = user?.id;
  // console.log(id)
  // const { loading, error, data } = useQuery(GET_USER, {variables: {id}});

  // console.log(data)

  const [read, setRead] = useState(false);


  function handleSignOut() {
    cookies.remove("user");
    cookies.remove("token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center content-center sm:items-center sm:justify-start ">
                <NavLink
                  to="/"
                  className="flex flex-shrink-0 items-center bg-white rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <img
                    className="block h-8 w-auto logo"
                    src={logo}
                    alt="All You Need"
                  />
                </NavLink>

                <div className="hidden sm:ml-6 sm:block ">
                  {/* put different NavLink here */}
                  {/* <NavLink
                to="/"
                className="bg-gray-900 text-white p-1 rounded mx-1 hover:bg-gray-700"
              >
                home
              </NavLink>
              <NavLink
                to="/"
                className="bg-gray-900 text-white p-1 rounded hover:bg-gray-700"
              >
                home
              </NavLink> */}
                </div>
              </div>
              {user ? (


                 


                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* notification dropdown */}
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                  ></button>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 notificationMenu  rounded-md bg-white shadow-lg">
                        <Menu.Item>
                          <a
                            href="#"
                            className={classNames(
                              read ? "" : "bg-blue-100",
                              "block px-4 py-4 text-sm text-gray-700 notification hover:bg-white"
                            )}
                          >
                            Notification 1
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="#"
                            className={classNames(
                              read ? "" : "bg-blue-100",
                              "block px-4 py-4 text-sm text-gray-700 notification hover:bg-white"
                            )}
                          >
                            Notification 2
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="#"
                            className={classNames(
                              read ? "" : "bg-blue-100",
                              "block px-4 py-4 text-sm text-gray-700 notification hover:bg-white"
                            )}
                          >
                            Notification 3
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="#"
                            className={classNames(
                              read ? "" : "bg-blue-100",
                              "block px-4 py-4 text-sm text-gray-700 notification hover:bg-white"
                            )}
                          >
                            Notification 1
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="#"
                            className={classNames(
                              read ? "" : "bg-blue-100",
                              "block px-4 py-4 text-sm text-gray-700 notification hover:bg-white"
                            )}
                          >
                            Notification 2
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="#"
                            className={classNames(
                              read ? "" : "bg-blue-100",
                              "block px-4 py-4 text-sm text-gray-700 notification hover:bg-white"
                            )}
                          >
                            Notification 3
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>





                  {/* cart */}


                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm">
                        <span className="sr-only">card</span>
                        {/* //TODo: add cart icon */}
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z" fill="#000"></path></svg>
                        
                        
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                      >
                  
                     
    
                        
                      
                    </Transition>
                  </Menu>
                   

                   
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm">
                        <span className="sr-only">Open user menu</span>
                        {/* //TODo: add user icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z" fill="#000"></path>
                          </svg>
                        
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                      >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-2 py-5"   style={{ backgroundColor: "#d8c5e0"}}>
                      {/* //TODo profile dropdown customize */}
                        <Menu.Item>
                        <NavLink to="/Profile" className="block text-sm mb-3 text-gray-700 hover:bg-white-400 flex items-center "  >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM14.5946 18.8115C14.5327 18.5511 14.5 18.2794 14.5 18C14.5 17.7207 14.5327 17.449 14.5945 17.1886L13.6029 16.6161L14.6029 14.884L15.5952 15.4569C15.9883 15.0851 16.4676 14.8034 17 14.6449V13.5H19V14.6449C19.5324 14.8034 20.0116 15.0851 20.4047 15.4569L21.3971 14.8839L22.3972 16.616L21.4055 17.1885C21.4673 17.449 21.5 17.7207 21.5 18C21.5 18.2793 21.4673 18.551 21.4055 18.8114L22.3972 19.3839L21.3972 21.116L20.4048 20.543C20.0117 20.9149 19.5325 21.1966 19.0001 21.355V22.5H17.0001V21.3551C16.4677 21.1967 15.9884 20.915 15.5953 20.5431L14.603 21.1161L13.6029 19.384L14.5946 18.8115ZM18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5Z" fill="#000"></path>
                        </svg>
                          <span class="ml-2">Profile</span>
                        </NavLink>


                        </Menu.Item>
                        <Menu.Item>
                        <button
                            onClick={handleSignOut}
                            className="text-sm mb-3 text-gray-700 hover:bg-white-400 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z" fill="#000"></path>
                            </svg>
                             <span class="ml-2">Sign out</span>
                        </button>

                        

                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                
                   








                           






              ) : (
                <div className="flex content-center  absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto ">
                  <NavLink
                    to="/LogIn"
                    className="rounded bg-blue-800 mx-2   p-1 text-center text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/SignUp"
                    className="rounded bg-green-800  p-1 text-center text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 text-center">
              {/* <NavLink
                to="/"
                className="bg-gray-900 text-white p-1 rounded  block"
              >
                home
              </NavLink>
              <NavLink
                to="/"
                className="bg-gray-900 text-white p-1 rounded block"
              >
               home
              </NavLink> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
