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
    setImage(e.target.files[0])
  }


async function handleSubmit(e) {
      e.preventDefault();
      setLoadingForm(true);
      let res = await addCategoryApi({description:categoryData.description,image,name:categoryData.name})
          if(res.data.createCategory.success){
            setCategoryData({name:"",description:""})
            setImage(null)
            // console.log(image)
            setCategoryError("")
          }
          else{
            setCategoryError(res.data.createCategory.errors[0])
          }
      setLoadingForm(false);
  }

 

  return (
     
    <form className="flex flex-col gap-3 mb-5"  onSubmit={(e)=>{
      handleSubmit(e);
    
      }}>
      {categoryError && <p className="text-red-300 bg-red-900 text-center rounded p-3">{categoryError}</p>}
      <label htmlFor="categoryName">Category Name</label>
      <input type="text" name="name" id="categoryName" value={categoryData.name} onChange={handleChange} required />

      <label htmlFor="description">Category Description</label>
      <textarea name="description" id="description" value={categoryData.description} onChange={handleChange} cols="30" rows="5" required></textarea>

      <label htmlFor="image">Upload Category Image</label>
      <input id="image" name='image' type="file" className='bg-gray-500 text-white' onChange={handleImageChange}  required/>


      <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow" disabled={loadingForm} type="submit"> {loadingForm ? "Create your Category" : "Add Category"}  </button>
    </form>
  )
}