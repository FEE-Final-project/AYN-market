import React from 'react'
import "./LoadingComponent.css"
import logo from "../../assets/logo.png"

export default function LoadingComponent() {
  //TODO: add a loading text
  return (
      <div className="progress"><img src={logo} className='logoPulse'/></div>
  )
}
