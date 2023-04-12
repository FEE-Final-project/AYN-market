import React, { useState } from 'react'
import SideBar from '../components/SideBar/SideBar';

export default function AdminPanel() {
  const [active, setActive] = useState("Dashboard");
  
  return (
    <div className='flex items-baseline adminPanel'>
      <SideBar setActive={setActive} />
      {
        active === "Dashboard" ?
          <div>Dashboard</div>
          : active === "Users" ?
            <div>Users</div>
            : active === "Products" ?
              <div>Products</div>
              : active === "Orders" ?
                <div>Orders</div> :
                <div> Categories </div>
      }

    </div>
  )
}
