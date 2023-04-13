import React from 'react'
import "./LoadingComponent.css"
import logo from "../../assets/logo.png"
export default function LoadingComponent() {
  return (
    <div>
      <div className="progress"><img src={logo} className='logoPulse'/></div>
     
    </div>
  )
}
