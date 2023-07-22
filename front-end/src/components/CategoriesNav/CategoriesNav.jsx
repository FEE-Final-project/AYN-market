import React from 'react';
import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';



import LoadingComponent from "../LoadingComponent/LoadingComponent";
import CategoryCard from '../Categories/CategoryCard';
import './CategoriesNav.css';

export default function CategoriesNav() {
    const { data, loading, error} = useFetchCategoriesApi();


    if (loading) return <LoadingComponent />;
    if (error) return <p>{error.message} </p>;
  
    const { edges,  totalCount } = data.categoryList;
  
    return (
      <section className='my-11'>
      <header className='text-center text-3xl lg:text-5xl mb-10 font-bold text-gray-900'>Our Categories</header>
        {
          totalCount === 0 ? <div className='bg-red-500 p-5 rounded text-center text-white  mt-10 '>no categories added yet </div> :
               
                <div className='block mx-5 lg:flex lg:items-center lg:justify-around mb-10 lg:flex-wrap  '>
                {edges.map(({ node }) => (
                  <CategoryCard key={node.id} node={node} edges={edges}  isCustomer={true} />
                ))}
                </div> 
        }
      </section>
  
    );
  
  }
  
