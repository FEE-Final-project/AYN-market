import React,{useState} from 'react'
import AddProductForm from './AddProductForm';
import ProductsFilter from './ProductsFilter';


export default function Products() {
  
    const [showProductForm, setShowProductForm] = useState(false);
    
  
    return (
      <aside className={showProductForm ? "mt-5 lg:mt-0 mx-auto" : " mt-5 lg:mt-0 mx-10"}>
      <div className='flex flex-col items-center'>
      <button className="bg-gray-200  hover:bg-gray-300 mb-5 text-gray-800  font-semibold py-2 px-4 border border-gray-400 rounded shadow"
       onClick={()=>setShowProductForm(prev=> !prev )}> {showProductForm ? "show products" : "add product"} </button>
      </div>
     
      {
        showProductForm ? <AddProductForm /> : <ProductsFilter /> 
      }
   
      </aside>
    )
  
}
