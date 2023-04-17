import React, { useState } from 'react'
import { useAdminMutations } from '../../hooks/useAdminMutations';

import LoadingComponent from "../LoadingComponent/LoadingComponent";


export default function AddCategoryForm() {
  const { addCategoryApi } = useAdminMutations();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);
  const [categoryError, setCategoryError] = useState("");

  function handleChange(e) {
    setCategoryData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  function handleImageChange(e) {
    setImage(e.target.files[0])
  }

 function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      console.log(image)
      formData.append('image', image);
      setLoading(true);
      addCategoryApi({description:categoryData.description,image:formData,name:categoryData.name})
      .then(
        (res) => {
          if(res.data.createCategory.success){
            setCategoryData({name:"",description:""})
            setImage(null)
          }
          console.log(res);
          setLoading(false);
        }
      )
      .catch(error=>{
        console.log(error);
        setLoading(false);
      })
  }

  if(loading){
    return <LoadingComponent />
  }

  return (
    <form className="flex flex-col gap-3 mb-5" onSubmit={handleSubmit}>

      <label htmlFor="categoryName">Category Name</label>
      <input type="text" name="name" id="categoryName" value={categoryData.name} onChange={handleChange} required />

      <label htmlFor="description">Category Description</label>
      <textarea name="description" id="description" value={categoryData.description} onChange={handleChange} cols="30" rows="5" required></textarea>

      <label htmlFor="image">Upload Category Image</label>
      <input id="image" name='image' type="file" className='bg-gray-500 text-white' onChange={handleImageChange}  required/>


      <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit"> Add Category </button>
    </form>
  )
}