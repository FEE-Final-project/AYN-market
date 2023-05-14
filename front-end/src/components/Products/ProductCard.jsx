import React,{useState} from 'react'
import { useAdminMutations } from '../../hooks/useAdminMutations';

import SpinnerComponent from '../LoadingComponent/SpinnerComponent';
import EditProductForm from './EditProductForm';
import logo from "../../assets/logo.png";

export default function ProductCard({product,isCustomer}) {
  const [showEditForm, setShowEditForm] = useState("");
  const { deleteProductApi } = useAdminMutations();
  const [loading , setLoading] = useState(false);

  const  handleDelete = async (id) => {
      setLoading(true);
      await deleteProductApi({ id })
      setLoading(false);
    }


  return (
    <>
{showEditForm === product.id ? 

    <EditProductForm  node={product} setShowEditForm={setShowEditForm} /> 
   : 
<div key={product.id} className="relative  w-64  mx-auto flex flex-col items-center shadow rounded lg:mx-2 my-5 bg-purple-100"  >
<img src={logo} className='w-64' alt="product image" />
<p className='my-2 font-extrabold'>{product.productName}</p>
<p className='my-2 font-extralight'>Price: ${product.price}</p>
{
  isCustomer ? <button className='bg-green-700 text-white p-2 rounded w-full hover:bg-green-500'> add to cart </button> : 
   <>
  <p className='my-2 font-extralight'>In Stock: {product.stock}</p>
  {/* delete button */}
  
  <button className='absolute left-1 top-1 bg-red-500 rounded p-1' onClick={() => handleDelete(product.id)}>
  { loading ? <SpinnerComponent /> :   <i className="ri-delete-bin-line text-white"></i>}
  </button>
  {/* edit button */}
  <button className='absolute right-1 top-1 bg-green-500 rounded p-1' onClick={() => setShowEditForm(product.id)}>
    <i className="ri-edit-line text-white"></i>
  </button>
  </>
}

</div>
}
</>
  )
}


