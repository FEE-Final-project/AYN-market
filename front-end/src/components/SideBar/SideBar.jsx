import React, { useState } from 'react'

//import components 
import { Sidebar } from 'flowbite-react';
//import styles and icons 
import './SideBar.css';
import 'remixicon/fonts/remixicon.css';

export default function SideBar({setActive}) {
    const [activeSidebar, setActiveSidebar] = useState(true);
    return (
      <div className=" w-full lg:w-fit lg:h-screen p-2 sideBarContainer">
      <button className={activeSidebar ?'toggleSideBar px-3 activeToggleSideBar  whitespace-nowrap' :'toggleSideBar displaySideBar absolute top-9   nonActiveToggleSideBar' } onClick={()=>setActiveSidebar(prev=>!prev)}> {activeSidebar ? "X" : <i className="ri-arrow-down-s-line text-lg"></i>} </button>
      { activeSidebar &&   <Sidebar aria-label="Sidebar with multi-level dropdown example" className="w-full  border-0 lg:border-r-2 lg:border-gray-800 lg:w-64 lg:text-left ">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            className="text-lg  font-semibold mb-10 relative "
                            onClick={() => setActive("Dashboard")}
                        >   
                            <div className="absolute top-0 left-0 w-1 h-full bg-lime-500"></div>
                            <i className="ri-dashboard-2-line text-lg mr-2"></i>
                            <span>Dashboard</span>
                        </Sidebar.Item>
                        <Sidebar.Item
                            className="text-lg font-semibold mb-10 relative "
                            onClick={() => setActive("Users")}
                        >  
                            <div className="absolute top-0 left-0 w-1 h-full bg-lime-500"></div>
                            <i className="ri-folder-user-line text-lg mr-2"></i>
                            <span>Users</span>
                        </Sidebar.Item>

                        <Sidebar.Item
                         className="text-lg font-semibold mb-10 relative"
                         onClick={() => setActive("Categories")}
                        >
                        <div className="absolute top-0 left-0 w-1 h-full bg-lime-500"></div>
                        <i className="ri-grid-fill text-lg mr-2"></i>
                        <span>Categories</span>
                        </Sidebar.Item>
                        <Sidebar.Item
                         className="text-lg font-semibold mb-10 relative"
                            onClick={() => setActive("Products")}
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-lime-500"></div>
                            <i className="ri-shopping-bag-line text-lg mr-2"></i>
                            <span>Products</span>
                        </Sidebar.Item>
                        <Sidebar.Item
                         className="text-lg font-semibold relative"
                          onClick={() => setActive("Orders")}

                          >
                            <div className="absolute top-0 left-0 w-1 h-full bg-lime-500"></div>
                            <i className="ri-money-pound-circle-line text-lg mr-2"></i>
                            <span> Orders</span>
                        </Sidebar.Item>

                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>}
        </div>
      
    )
}
