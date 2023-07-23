import React,{useState} from 'react'

import { useAdminMutations } from '../../hooks/useAdminMutations';


export default function EditCategoryForm({node,  setShowEditForm}) {
  const { updateCategoryApi } = useAdminMutations();
  const [loadingForm, setLoadingForm] = useState(false);

  const [categoryUpdatedData, setCategoryUpdatedData] = useState({ categoryName: node.categoryName, description: node.description});
  const [image, setImage] = useState(node.image);
  const [categoryError, setCategoryError] = useState(null);

  function handleChange(e) {
    setCategoryUpdatedData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
function handleImageChange(e) {
  const {
    target: {
      files: [file],
    }
  } = e;
  setImage(file)
    }
  
async function handleSubmit(e) {
    e.preventDefault();
    setLoadingForm(true);
    let res = await updateCategoryApi({id:node.id,description:categoryUpdatedData.description,image,categoryName:categoryUpdatedData.categoryName})
    
        if(res.data.updateCategory.success){
          setCategoryData({name:"",description:""})
          setImage(null)
          setCategoryError("")
        }
        else{
          setCategoryError(res.data.updateCategory.errors[0])
        }
    setLoadingForm(false);
}

  return (
    <form className="flex flex-col w-25 mx-2  gap-1 bg-red-200 p-3 rounded shadow-lg" onSubmit={handleSubmit} >
      {categoryError && <p className="text-red-300 bg-red-900 text-center rounded p-3">{categoryError}</p>}
      <label htmlFor="categoryName" className='text-gray-900 font-mono'>Category Name</label>
      <input type="text" className='rounded outline-0 border-0' name="categoryName" id="categoryName" value={categoryUpdatedData.categoryName} onChange={handleChange}   />

      <label htmlFor="description" className='text-gray-900 font-mono' >Category Description</label>
      <textarea name="description"  value={categoryUpdatedData.description} onChange={handleChange} className='rounded outline-0 border-0' id="description" cols="30" rows="5"></textarea>

      <label htmlFor="image" className='text-gray-900 font-mono'>Upload Category Image</label>
      <input id="image" name='image' type="file" className='bg-gray-500 text-white' onChange={handleImageChange} />

      <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow" disabled={loadingForm} type="submit"> {loadingForm ? "Updating your Category" : "Save Changes"}  </button>
      <button className='text-gray-500 bg-gray-50 rounded font-semibold p-2' onClick={()=> setShowEditForm("")}>discard</button>
    </form>
 
  )
}
