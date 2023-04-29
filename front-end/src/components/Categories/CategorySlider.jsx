import React,{useState} from 'react'
import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';
import { useAdminMutations } from '../../hooks/useAdminMutations';
import logo from "../../assets/logo.png"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import 'remixicon/fonts/remixicon.css';

const PAGE_SIZE = 3;

export default function CategorySlider() {
    const [afterCursor, setAfterCursor] = useState(null);
    const [beforeCursor, setBeforeCursor] = useState(null);
    const {data , loading ,error ,reloadCategories } = useFetchCategoriesApi(PAGE_SIZE  , afterCursor , beforeCursor);
    const { deleteCategoryApi } = useAdminMutations();
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message} </p>;
    
    const { edges, pageInfo , totalCount } = data.categoryList;
    
    
      console.log("from api after cursor 'end cursor' " + pageInfo.endCursor)
      console.log("from api before cursor 'start cursor' " + pageInfo.startCursor)
      console.log("local state for after cursor" + afterCursor)
      console.log("local state for before cursor" + beforeCursor)
      
      const handlePrevClick = () => {
          setAfterCursor(null);
          setBeforeCursor(pageInfo.startCursor);
      };
   
      const handleNextClick = () => {
        setAfterCursor(pageInfo.endCursor);
        setBeforeCursor(null);
      };

      const handleDelete = (id)=>{
        deleteCategoryApi({id})
        if(edges.length === 1){
          handlePrevClick();
        }
        else
        reloadCategories();
      }

    //TODO: add toast notification for success and error 
    //TODO: add loading delete button
    //TODO: fix prev bug 
    //TODO: add edit button
    //TODO: fix refetch after the first page bug

    
      return (
        <>
          {
            totalCount === 0 ? <div className='bg-red-500 p-5 rounded text-center text-white  my-10 '>no categories added yet </div> : 
            <div className='flex items-center'>
          <button
              className="shrink-0  h-24 rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={!pageInfo.hasPreviousPage} onClick={handlePrevClick}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {edges.map(({ node }) => (
              <div key={node.id} className='relative flex flex-col items-center shadow rounded mx-2 my-5 w-1/3'>
                <p className='my-2'>{node.categoryName}</p>
                <img src={logo} className='w-64' alt="category logo" />
                <button className='absolute left-1 top-1 bg-red-500 rounded p-1' onClick={()=>handleDelete(node.id)}>
                  <i className="ri-delete-bin-line text-white"></i>
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
          </div>

          }
          </>
  
      );

}
