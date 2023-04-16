import React, { useState } from 'react'
// import { gql, useMutation } from '@apollo/client';
import Cookies from "universal-cookie";

import LoadingComponent from "../LoadingComponent/LoadingComponent";

// const ADD_CATEGORY = gql`
//   mutation($input: CreateCategoryInput!){
//     createCategory(input: $input){
//       errors
//       success
//     }
//   }
// `

export default function AddCategoryForm() {

  // const [createCategory, { loading, error }] = useMutation(ADD_CATEGORY);


  const [categoryData, setCategoryData] = useState({ name: "", description: "" });
  let image;
  function handleChange(e) {
    setCategoryData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleImageChange(e) {
    image = e.target.files[0];
  }

  async function handleSubmit(e) {
    // try {
      e.preventDefault();
      let formData = new FormData();
      formData.append("image", image)
      const requestOptions = {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
          'Authorization': `JWT ${new Cookies().get('token')}`
        },
        body:JSON.stringify({
          query:`
          mutation CreateCategory{
            createCategory(input: {name:"hello"}){
              errors
              success
            }
          }
            `
        })
      }
      // let response = await createCategory({ variables: { input:{description:categoryData.description,image,name:categoryData.name}}});
      fetch('http://localhost:8000/graphql/',requestOptions)
      .then(res=>res.json())
      .then(data => console.log(data))
      .catch(error=>console.log(error))
      // console.log(response)
    // }
    // catch (err) {
    //   console.log(err)
    // }
  }

  return (
    <form className="flex flex-col gap-3 mb-5" onSubmit={handleSubmit}>

      <label htmlFor="categoryName">Category Name</label>
      <input type="text" name="name" id="categoryName" value={categoryData.name} onChange={handleChange} />

      <label htmlFor="description">Category Description</label>
      <textarea name="description" id="description" value={categoryData.description} onChange={handleChange} cols="30" rows="5"></textarea>

      <label htmlFor="image">Upload Category Image</label>
      <input id="image" name='image' type="file" className='bg-gray-500 text-white' onChange={handleImageChange} />


      <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit"> Add Category </button>
    </form>
  )
}