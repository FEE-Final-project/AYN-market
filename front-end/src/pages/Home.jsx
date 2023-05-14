import React from 'react'

import ProductsCards from '../components/Products/ProductsCards';
import Slider from '../components/Slider/Slider';

export default function Home() {
  return (
    <>
    <Slider />
    <ProductsCards isCustomer={true} />
    </>
  )
}
