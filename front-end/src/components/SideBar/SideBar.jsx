import React, { useState } from 'react'

//import components 
import { Sidebar } from 'flowbite-react';
//import styles and icons 
import './SideBar.css';
import 'remixicon/fonts/remixicon.css';

export default function SideBar({setActive}) {
    const [activeSidebar, setActiveSidebar] = useState(true);
    return (
      <div className="w-fit h-screen p-2 sideBarContainer">
      <button className={activeSidebar ?'toggleSideBar px-3 activeToggleSideBar  whitespace-nowrap' :'toggleSideBar  nonActiveToggleSideBar' } onClick={()=>setActiveSidebar(prev=>!prev)}> {activeSidebar ? "X" : "⬇"} </button>
      { activeSidebar &&   <Sidebar aria-label="Sidebar with multi-level dropdown example" className="border-r-2 border-lime-500">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            className="text-lg font-semibold mb-10"
                            onClick={() => setActive("Dashboard")}
                        >
                            <i className="ri-dashboard-2-line text-lg mr-2"></i>
                            <span>Dashboard</span>
                        </Sidebar.Item>
                        <Sidebar.Item
                            className="text-lg font-semibold mb-10"
                            onClick={() => setActive("Users")}
                        >
                            <i className="ri-folder-user-line text-lg mr-2"></i>
                            <span>Users</span>
                        </Sidebar.Item>

                        <Sidebar.Item
                         className="text-lg font-semibold mb-10"
                         onClick={() => setActive("Categories")}
                        >
                        <i className="ri-grid-fill text-lg mr-2"></i>
                        <span>Categories</span>
                        </Sidebar.Item>
                        <Sidebar.Item
                         className="text-lg font-semibold mb-10"
                            onClick={() => setActive("Products")}
                        >
                            <i className="ri-shopping-bag-line text-lg mr-2"></i>
                            <span>Products</span>
                        </Sidebar.Item>
                        <Sidebar.Item
                         className="text-lg font-semibold"
                          onClick={() => setActive("Orders")}

                          >
                            <i className="ri-money-pound-circle-line text-lg mr-2"></i>
                            <span> Orders</span>
                        </Sidebar.Item>

                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>}
        </div>
      
    )
}
