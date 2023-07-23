import React from 'react'

import nike from '../../assets/brands/Nike.png'
import adidas from '../../assets/brands/adidas.png'
import chanel from '../../assets/brands/chanel.png'
import hp from '../../assets/brands/hp.png'
import dell from '../../assets/brands/dell.png'
import Rolex from '../../assets/brands/Rolex.png'


export default function OurBrands() {
  return (
    <section className='my-11'>
    <header className='text-center text-3xl lg:text-5xl mb-10 font-bold text-gray-900'>Our Brands</header>
    <div className='flex justify-around items-center'>
    <img className='w-1/12  opacity-50 hover:opacity-100' src={nike} alt=" nike brand logo" />
    <img className='w-2/12   opacity-50 hover:opacity-100 ' src={adidas} alt="adidas brand logo" />
    <img className='w-1/12   opacity-50 hover:opacity-100 ' src={chanel} alt="chanel brand logo" />
    <img className='w-1/12  opacity-50 hover:opacity-100 ' src={hp} alt="hp brand logo" />
    <img className='w-1/12 opacity-50 hover:opacity-100 ' src={dell} alt="dell brand logo" />
    <img className='w-1/12   opacity-50 hover:opacity-100' src={Rolex} alt="Rolex brand logo" />
    </div>
   </section>
  )
}
