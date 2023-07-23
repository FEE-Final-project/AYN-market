import React,{useState} from 'react'
import ProductsCards from '../components/Products/ProductsCards';

import 'remixicon/fonts/remixicon.css';

export default function CategoryProducts() {
  const categoryName = window.location.pathname.split('/')[2];

  const [productName,setProductName] = useState('');

  const [showFilters,setShowFilters] = useState(false);

  const [filter,setFilter] = useState({
    priceLt:'',
    priceGt:'',
    price:''
  });
  
 
  const handleSearch = (e) => {
    setProductName(e.target.value);
  }

  const handleFilter = (e) => {
   setFilter(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  return (
    <section className='my-10 w-11/12 mx-auto'>
        
        <header className='flex justify-between  text-gray-800'>
        <p className='text-3xl font-bold'>{categoryName} products</p>
        <aside className='relative mt-5 w-full lg:w-fit lg:mt-0'>
        <input type="text" className="rounded-full w-full lg:w-fit border-2 border-gray-300 bg-white  px-4 focus:outline-none focus:border-blue-500" placeholder='search by name' onChange={handleSearch}  />
        <i className="ri-search-line absolute left-60 top-2"></i>
        <button onClick={()=>setShowFilters(prev=>(!prev))} > <i className="ri-filter-fill text-gray-800 font-bold text-xl"></i> </button>
        {
          showFilters && <div className='flex flex-col items-center mt-2 bg-gray-500 rounded p-2'>
                   <h1 className='text-center text-white font-bold '>filter by price</h1>
                   <input type="number" name='priceGt' value={filter.priceGt} className="rounded  my-1 border-2 border-gray-300 bg-white  px-1 focus:outline-none focus:border-blue-500" placeholder='price greater than' onChange={handleFilter}  />
                  <input type="number" name='priceLt' value={filter.priceLt} className="rounded   border-2 border-gray-300 bg-white  px-1 my-1 focus:outline-none focus:border-blue-500" placeholder='price less than' onChange={handleFilter}  />
                  <h2 className='text-center text-white font-bold '>Looking for exact price ?</h2>
                  <input type="number" name="price" value={filter.price} className="rounded  my-1 border-2 border-gray-300 bg-white  px-1 focus:outline-none focus:border-blue-500" placeholder='here you can enter it' onChange={handleFilter}  />
        </div>
       
        }
       
 
       
        </aside>

        </header>
        <ProductsCards isCustomer={true} categoryName={categoryName} productName={productName} priceLt={filter.priceLt} priceGt={filter.priceGt} price={filter.price} />
    </section>
  )
}
