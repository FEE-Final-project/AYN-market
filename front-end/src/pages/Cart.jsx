import React, { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const navigate = useNavigate();
  useEffect(() => {
    if(!user || user.isSuperuser){
    navigate('/')
    }
  }, [user])
  
  return (
    <div>Cart</div>
  )
}
