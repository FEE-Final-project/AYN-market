import React from 'react'
import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';



import LoadingComponent from "../LoadingComponent/LoadingComponent";
import CategoryCard from './CategoryCard';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import 'remixicon/fonts/remixicon.css';
import './category.css';

let PAGE_SIZE = 3;

// window.addEventListener('resize', () => {
//   const width = window.innerWidth;
//   if (width >= 768) {
//    PAGE_SIZE = 3;
//   }
//   else {
//     PAGE_SIZE = 1;
//   }
// });

export default function CategorySlider() {
  const { data, loading, error, fetchMore } = useFetchCategoriesApi(PAGE_SIZE);


  if (loading) return <LoadingComponent />;
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




  //TODO: add toast notification for success and error 
  //TODO: add loading delete button
  //TODO: handle prev to the right page

  return (
    <>
      {
        totalCount === 0 ? <div className='bg-red-500 p-5 rounded text-center text-white  mt-10 '>no categories added yet </div> :
          totalCount > 3 ?
            <div className='flex items-center mb-5'>
              <button
                className="shrink-0  h-24 rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ml-2 lg:ml-0"
                disabled={!pageInfo.hasPreviousPage} onClick={handlePrevClick}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className='block mx-auto lg:flex lg:items-center lg:mb-5 '>
              {edges.map(({ node }, i) => (
                <CategoryCard node={node} edges={edges} index={i} handlePrevClick={handlePrevClick} />
              ))}
              </div>
              <button
                className="shrink-0  h-24  rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 mr-2 lg:mr-0"
                disabled={!pageInfo.hasNextPage} onClick={handleNextClick}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div> :
            <div className='block mx-auto lg:flex lg:items-center lg:mb-5 '>
              {edges.map(({ node }, i) => (
                <CategoryCard node={node} edges={edges} index={i} handlePrevClick={handlePrevClick} />
              ))}
            </div>

      }
    </>

  );

}
