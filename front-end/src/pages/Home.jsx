import React from 'react'


import Slider from '../components/Slider/Slider';
import CategoriesNav from '../components/CategoriesNav/CategoriesNav';
import OurBrands from '../components/OurBrands/OurBrands';
import OurCustomerReviews from '../components/CustomerReviews/OurCustomerReviews';
import AboutUs from '../components/AboutUs/AboutUs';
import OurTeam from '../components/OurTeam/OurTeam';

export default function Home() {
  return (
    <>
    <Slider />
    <CategoriesNav />
    <OurBrands />
    <OurCustomerReviews />
    <AboutUs />
    <OurTeam />
    </>
  )
}
