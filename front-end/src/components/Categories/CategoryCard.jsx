import React,{useState} from 'react';
import { useAdminMutations } from '../../hooks/useAdminMutations';

import SpinnerComponent from '../LoadingComponent/SpinnerComponent';
import EditCategoryForm from './EditCategoryForm';
import logo from "../../assets/logo.png";

export default function CategoryCard({edges,node,handlePrevClick , index}) {
    const [showEditForm, setShowEditForm] = useState("");
    const { deleteCategoryApi } = useAdminMutations();
    const [loading , setLoading] = useState(false);

    const  handleDelete = async (id) => {
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
    {showEditForm === node.id ? 

        <EditCategoryForm key={index}  node={node} setShowEditForm={setShowEditForm} /> 
       : 
    <div key={node.id} className={edges.length < 3 ? "relative  w-full flex flex-col items-center shadow rounded lg:mx-2 my-5" : "relative flex flex-col items-center  shadow rounded lg:mx-2 my-5 lg:w-1/3"} >
    <p className='my-2'>{node.categoryName}</p>
    <img src={logo} className='w-64' alt="category logo" />
    {/* delete button */}
    <button className='absolute left-1 top-1 bg-red-500 rounded p-1' onClick={() => handleDelete(node.id)}>
    { loading ? <SpinnerComponent /> :   <i className="ri-delete-bin-line text-white"></i>}
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
