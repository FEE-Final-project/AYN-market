import React,{useState} from 'react'
import AddCategoryForm from './AddCategoryForm'

export default function Categories() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  return (
    <aside className='mx-5'>
    <button className="bg-gray-200 hover:bg-gray-300 mb-5 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={()=>setShowCategoryForm(prev=> !prev )}> add category</button>
    {
      showCategoryForm && <AddCategoryForm/>
    }
     

    </aside>
  )
}