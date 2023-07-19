import React, {  useState } from 'react'
import { useAdminMutations } from '../../hooks/useAdminMutations';


export default function AddCategoryForm() {
  //TODO: image upload fix
  const { addCategoryApi } = useAdminMutations();
  const [loadingForm, setLoadingForm] = useState(false);
  const [categoryData, setCategoryData] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);
  const [categoryError, setCategoryError] = useState("");


  function handleChange(e) {
    setCategoryData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  function handleImageChange(e) {
    const {
      target: {
        files: [file],
      }
    } = e;
    console.log(file)
    setImage(file)
  }


async function handleSubmit(e) {
      e.preventDefault();
      setLoadingForm(true);
   
      let res = await addCategoryApi({description:categoryData.description,image,name:categoryData.name})
          if(res.data.createCategory.success){
            setCategoryData({name:"",description:""})
            setImage(null)
            console.log(image)
            setCategoryError("")
          }
          else{
            setCategoryError(res.data.createCategory.errors[0])
          }
      setLoadingForm(false);
  }


  return (
     
    <form className="flex flex-col w-fit mx-auto  gap-3 mb-5 bg-red-200 p-5 rounded shadow-lg"  onSubmit={(e)=>{
      handleSubmit(e);
    
      }}>
      {categoryError && <p className="text-red-300 bg-red-900 text-center rounded p-3">{categoryError}</p>}
      <label htmlFor="categoryName" className='text-gray-900 font-mono'>Category Name</label>
      <input type="text" className='rounded outline-0 border-0' name="name" id="categoryName" value={categoryData.name} onChange={handleChange} required />

      <label htmlFor="description" className='text-gray-900 font-mono' >Category Description</label>
      <textarea name="description" className='rounded outline-0 border-0' id="description" value={categoryData.description} onChange={handleChange} cols="30" rows="5" required></textarea>

      <label htmlFor="image" className='text-gray-900 font-mono'>Upload Category Image</label>
      <input id="image" name='image' type="file" className='bg-gray-500 text-white' onChange={handleImageChange}  />


      <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow" disabled={loadingForm} type="submit"> {loadingForm ? "Creating your Category" : "Add Category"}  </button>
    </form>
  )
}