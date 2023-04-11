import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuthContext } from '../hooks/useAuthContext'
import Cookies from 'universal-cookie';

export default function AdminPanel() {
const user = new Cookies().get("user");

 console.log(user)
 useEffect(() => {
  if(!user.isSuperuser){
    navigate("/")
  }
 })
  return (
    <div>AdminPanel</div>
  )
}
