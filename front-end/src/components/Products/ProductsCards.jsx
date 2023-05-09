import React,{useState} from 'react'


import LoadingComponent from '../LoadingComponent/LoadingComponent';
import './Product.css'



export default function ProductsCards({categoryName , productName}) {
  
   
  return (
    <>
      <main>
      {categoryName}
      {productName}
      </main>
    </>
  )
}
