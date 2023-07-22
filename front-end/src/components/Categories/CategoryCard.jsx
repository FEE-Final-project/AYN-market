import React, { useState } from 'react';
import { useAdminMutations } from '../../hooks/useAdminMutations';
import { Link } from 'react-router-dom';

import SpinnerComponent from '../LoadingComponent/SpinnerComponent';
import EditCategoryForm from './EditCategoryForm';
import logo from "../../assets/logo.png";
import categoryImage from '../../assets/sports.jpeg'
import './category.css';
import AnimBg from '../AnimatorBackGround/AnimBg';

export default function CategoryCard({ edges, node, handlePrevClick, index, isCustomer }) {
  const [showEditForm, setShowEditForm] = useState("");
  const { deleteCategoryApi } = useAdminMutations();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteCategoryApi({ id })
    setLoading(false);
    if (edges.length === 0) {
      handlePrevClick();
    }
    setLoading(false);
  }

  return (
    <>
      {isCustomer ? 
      <div className='categoryCard w-full mb-3 p-32 md:p-60  mx-auto lg:w-2/5  lg:mb-10 '>
      <div className=' frontCategoryCard cursor-pointer z-50'>
      <p className='my-2 text-center text-2xl md:text-4xl  text-white absolute  left-2/4'>{node.categoryName}</p>
      <img src={categoryImage} className='rounded categoryImage'  alt="category logo" />
      </div>
      <div className='backCategoryCard bg-violet-800 rounded  flex flex-col items-center justify-center'>
        <AnimBg isCategory={true}/>
        <Link to={`/products/${node.categoryName}`} className='bg-green-900 p-5 rounded text-center text-white text-2xl hover:w-2/3 hover:bg-green-500 z-50'>Show Products</Link>
      </div>
      </div>
      
       : showEditForm === node.id ?

        <EditCategoryForm key={index} node={node} setShowEditForm={setShowEditForm} />
        :
        <div key={node.id} className={edges.length < 3 ? "relative  w-full flex flex-col items-center shadow rounded lg:mx-2 my-5" : "relative flex flex-col items-center  shadow rounded lg:mx-2 my-5 lg:w-1/3"} >
          <p className='my-2'>{node.categoryName}</p>
          <img src={logo} className='w-64' alt="category logo" />
          {/* delete button */}
          <button className='absolute left-1 top-1 bg-red-500 rounded p-1' onClick={() => handleDelete(node.id)}>
            {loading ? <SpinnerComponent /> : <i className="ri-delete-bin-line text-white"></i>}
          </button>
          {/* edit button */}
          <button className='absolute right-1 top-1 bg-green-500 rounded p-1' onClick={() => setShowEditForm(node.id)}>
            <i className="ri-edit-line text-white"></i>
          </button>
        </div>
      }
    </>
  )
}
