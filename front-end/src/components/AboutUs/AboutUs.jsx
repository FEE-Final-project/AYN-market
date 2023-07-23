import React from 'react'
import aboutUs from "../../assets/aboutUs.jpg"

export default function AboutUs() {
    return (
        <section className="relative isolate my-11 overflow-hidden bg-gray-800 py-20 sm:py-32">
          <img
            src={aboutUs}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full bg-blend-darken mix-blend-multiply object-cover object-right md:object-center"
          />
         
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About us</h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                All you need Market is an e-commerce website that sells all kinds of products. We are a team of 7 people who are passionate about what we do. We are based in Egypt and we are looking forward to expand our business to the whole world.
              </p>
            </div>
          </div>
        </section>
      )
}
