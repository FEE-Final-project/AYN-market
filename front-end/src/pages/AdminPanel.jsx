import React, { useState } from 'react'
import SideBar from '../components/SideBar/SideBar';
import Categories from '../components/Categories/Categories';
import Products from '../components/Products/Products';

export default function AdminPanel() {
  const [active, setActive] = useState("Dashboard");
  
  return (
    <div className='block lg:flex lg:items-baseline'>
      <SideBar setActive={setActive} />
      {
        active === "Dashboard" ?
          <div>Dashboard</div>
          : active === "Users" ?
            <div>Users</div>
            : active === "Products" ?
              <Products />
              : active === "Orders" ?
                <div>Orders</div> :
                <Categories />
      }

    </div>
  )
}
