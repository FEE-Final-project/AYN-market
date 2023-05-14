import React from 'react'
import { Carousel } from 'flowbite-react'

import fastDeliver from '../../assets/fastDeliver.jpg'
import accessibility from '../../assets/accesibilty.jpg'
import diversity from '../../assets/diversity.jpg'
import purchase from '../../assets/purchase.jpg'

import './Slider.css'

export default function Slider() {
  return (
    <div className="h-64  sliderContainer">
    <Carousel slide={false} className='sliderItems'>
    <div className='relative'>
      <img
        src={accessibility}
        alt="..."
      />
      <p className='absolute text-shadows top-2/4 left-1/4 font-extrabold '> Easy to used by different ages</p>
    </div>
    <div className='relative'>
      <img
        src={diversity}
        alt="..."
      />
         <p className='absolute text-shadows top-2/4 left-1/4 font-extrabold '>Diversity of products</p>
    </div>
    <div className='relative'>
      <img
          src={fastDeliver}
          alt="..."
      />
         <p className='absolute text-shadows top-2/4 left-1/4 font-extrabold '>Deliver on time</p>
    </div>
    <div className='relative'>
      <img
           src={purchase}
           alt="..."
      />
         <p className='absolute text-shadows top-2/4 left-1/4 font-extrabold '>Different payment methods</p>
    </div>
    </Carousel>
  </div>
  )
}
