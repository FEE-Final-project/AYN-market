import React from 'react'

export default function OurCustomerReviews() {
  return (
    <section className='my-11'>
     <header className='text-center text-3xl lg:text-5xl mb-10 font-bold text-gray-900'>Our Customer Testimonials</header>

     <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 flex justify-around flex-wrap">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="w-full lg:w-3/12">
      
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
              molestiae. Numquam corrupti in laborum sed rerum et corporis.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              className="mx-auto h-20 w-20 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
              <p className="font-semibold text-center mt-3 text-gray-900">Judith Black</p>
          </figcaption>
        </figure>
      </div>
      <div className="lg:w-3/12">
      
      <figure className="mt-10">
        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
          <p>
            “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
            molestiae. Numquam corrupti in laborum sed rerum et corporis.”
          </p>
        </blockquote>
        <figcaption className="mt-10">
            <img
              className="mx-auto h-20 w-20 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
              <p className="font-semibold text-center mt-3 text-gray-900">Judith Black</p>
          </figcaption>
      </figure>
    </div>
    <div className="lg:w-3/12">
      
      <figure className="mt-10">
        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
          <p>
            “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
            molestiae. Numquam corrupti in laborum sed rerum et corporis.”
          </p>
        </blockquote>
        <figcaption className="mt-10">
            <img
              className="mx-auto h-20 w-20 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
              <p className="font-semibold text-center mt-3 text-gray-900">Judith Black</p>
          </figcaption>
      </figure>
    </div>
    </section>
    </section>
  )
}
