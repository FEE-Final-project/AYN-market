import React from 'react'
import ProductsCards from '../components/Products/ProductsCards';

export default function CategoryProducts() {
  const categoryName = window.location.pathname.split('/')[2];
  return (
    <section className='my-10 w-11/12 mx-auto'>
        <header className=' text-3xl font-bold text-gray-800'>{categoryName} products</header>
        <ProductsCards isCustomer={true} categoryName={categoryName} />
    </section>
  )
}
