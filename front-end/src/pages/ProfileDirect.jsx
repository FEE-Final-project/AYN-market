import React from 'react'
import AdminPanel from './AdminPanel';
import Profile from './Profile';
import Cookies from "universal-cookie";

export default function ProfileDirect() {
  const user = new Cookies().get("user");

  return (
    <div> {user.isSuperuser ? <AdminPanel/> : <Profile/> }</div>
  )
}
