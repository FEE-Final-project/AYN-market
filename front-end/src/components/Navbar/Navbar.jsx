import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.svg";
import "./Navbar.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [read, setRead] = useState(false);

  return (
    <Disclosure as="nav" className="bg-gray-800">
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
                  exact
                  activeClassName="active"
                  className="flex flex-shrink-0 items-center bg-white rounded-full bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <img
                    className="block h-8 w-auto logo"
                    src={logo}
                    alt="All You Need"
                  />
                </NavLink>

                <div className="hidden sm:ml-6 sm:block ">
                  {/* put different NavLink here */}
                  <NavLink
                to="/"
                exact
                activeClassName="active"
                className="bg-gray-900 text-white p-1 rounded mx-1 hover:bg-gray-700"
              >
                home
              </NavLink>
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="bg-gray-900 text-white p-1 rounded hover:bg-gray-700"
              >
                home
              </NavLink>
                </div>
              </div>
              {loggedIn ? (
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

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          white
                        />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Your Profile
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </a>
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
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="bg-gray-900 text-white p-1 rounded  block"
              >
                home
              </NavLink>
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="bg-gray-900 text-white p-1 rounded block"
              >
               home
              </NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
