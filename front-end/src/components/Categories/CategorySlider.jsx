import React, { useState } from 'react'
import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';
import { useAdminMutations } from '../../hooks/useAdminMutations';

import EditCategoryForm from './EditCategoryForm';
import logo from "../../assets/logo.png"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import 'remixicon/fonts/remixicon.css';
import './category.css';

const PAGE_SIZE = 3;

export default function CategorySlider() {
  const { data, loading, error, reloadCategories, fetchMore } = useFetchCategoriesApi(PAGE_SIZE);
  const { deleteCategoryApi } = useAdminMutations();
  const [showEditForm, setShowEditForm] = useState("");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message} </p>;

  const { edges, pageInfo, totalCount } = data.categoryList;


  // console.log("from api after cursor 'end cursor' " + pageInfo.endCursor)
  // console.log("from api before cursor 'start cursor' " + pageInfo.startCursor)

  const handlePrevClick = () => {
    fetchMore({
      variables: {
        last: PAGE_SIZE,
        before: pageInfo.startCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return {
          categoryList: {
            edges: fetchMoreResult.categoryList.edges,
            pageInfo: { hasPreviousPage: fetchMoreResult.categoryList.pageInfo.hasPreviousPage, hasNextPage: true, startCursor: fetchMoreResult.categoryList.pageInfo.startCursor, endCursor: fetchMoreResult.categoryList.pageInfo.endCursor },
            totalCount: fetchMoreResult.categoryList.totalCount,
            __typename: prevResult.categoryList.__typename,
          },
        };
      },
    });
  };

  const handleNextClick = () => {
    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return {
          categoryList: {
            edges: fetchMoreResult.categoryList.edges,
            pageInfo: { hasPreviousPage: true, hasNextPage: fetchMoreResult.categoryList.pageInfo.hasNextPage, startCursor: fetchMoreResult.categoryList.pageInfo.startCursor, endCursor: fetchMoreResult.categoryList.pageInfo.endCursor },
            totalCount: fetchMoreResult.categoryList.totalCount,
            __typename: prevResult.categoryList.__typename,

          },
        };
      },
    });

  };


  const handleDelete = (id) => {
    deleteCategoryApi({ id })
    if (edges.length === 0) {
      handlePrevClick();
    }
    else
      reloadCategories();
  }

 
  //TODO: add toast notification for success and error 
  //TODO: add loading delete button
  //TODO: handle prev to the right page
  //TODO: add edit button
 

  return (
    <>
      {
        totalCount === 0 ? <div className='bg-red-500 p-5 rounded text-center text-white  mt-10 '>no categories added yet </div> :
          totalCount > 3 ?
            <div className='flex items-center mb-5'>
              <button
                className="shrink-0  h-24 rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                disabled={!pageInfo.hasPreviousPage} onClick={handlePrevClick}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {edges.map(({ node }) => (
                 showEditForm === node.id ? 
                 
                 <EditCategoryForm className="backCategory" node={node}  setShowEditForm={setShowEditForm} /> 
                 
                 :
                <div key={node.id} className={edges.length < 3 ? "frontCategory relative w-full flex flex-col items-center shadow rounded mx-2 my-5" : "frontCategory relative flex flex-col items-center shadow rounded mx-2 my-5 w-1/3"}>
                  <p className='my-2'>{node.categoryName}</p>
                  <img src={logo} className='w-64' alt="category logo" />
                  <button className='absolute left-1 top-1 bg-red-500 rounded p-1' onClick={() => handleDelete(node.id)}>
                    <i className="ri-delete-bin-line text-white"></i>
                  </button>
                  {/* edit button */}
                  <button className='absolute right-1 top-1 bg-green-500 rounded p-1' onClick={() => setShowEditForm(node.id)}>
                    <i className="ri-edit-line text-white"></i>
                  </button>
                
                </div>
              ))}
              <button
                className="shrink-0  h-24  rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                disabled={!pageInfo.hasNextPage} onClick={handleNextClick}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div> :
            <div className='flex items-center mb-5'>
              {edges.map(({ node }) => (
                    showEditForm === node.id ? 

                     <EditCategoryForm className="backCategory" node={node} setShowEditForm={setShowEditForm} /> 
                    : 
                    
                    <div key={node.id} className={edges.length < 3 ? "frontCategory relative w-full flex flex-col items-center shadow rounded mx-2 my-5" : "relative flex flex-col items-center shadow rounded mx-2 my-5 w-1/3"} >
                    <p className='my-2'>{node.categoryName}</p>
                    <img src={logo} className='w-64' alt="category logo" />
                    <button className='absolute left-1 top-1 bg-red-500 rounded p-1' onClick={() => handleDelete(node.id)}>
                      <i className="ri-delete-bin-line text-white"></i>
                    </button>
                    {/* edit button */}
                    <button className='absolute right-1 top-1 bg-green-500 rounded p-1' onClick={() => setShowEditForm(node.id)}>
                      <i className="ri-edit-line text-white"></i>
                    </button>
                    </div>
                  
              ))}
            </div>

      }
    </>

  );

}
