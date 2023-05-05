import React,{ useState} from 'react'

import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';


import LoadingComponent from '../LoadingComponent/LoadingComponent';
import './Product.css'

let PAGE_SIZE = 2;

export default function ProductsCards() {
  const { data: categoryData, loading: categoryLoading, error: categoryError, fetchMore } = useFetchCategoriesApi(PAGE_SIZE);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(1);
  const [loadingSlider,setLoadingSlider] = useState(false);

  if (categoryLoading) return <LoadingComponent />;
  if (categoryError) return <p>{error.message} </p>;

  
  const { edges, pageInfo ,totalCount } = categoryData.categoryList;
  
  const handleNextPage = async () => {
    setStartIndex(startIndex+1);
    setEndIndex(endIndex+1);
    setLoadingSlider(true);
    console.log(loadingSlider)
    if(edges.length === totalCount){
      if(endIndex === edges.length-2){
       
        setEndIndex(endIndex+2);
      }
      setLoadingSlider(false);
      return;
    }
    if(edges.length === totalCount-1){
       setEndIndex(endIndex+2);
    }
   await fetchMore({
      variables: {
        first: 1,
        after: pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.categoryList.edges;
        return {
          categoryList: {
            edges: [...prevResult.categoryList.edges,...newEdges],
            pageInfo: fetchMoreResult.categoryList.pageInfo,
            totalCount: fetchMoreResult.categoryList.totalCount,
            __typename: prevResult.categoryList.__typename,
          }
        }
      },
    });
    setLoadingSlider(false);
  };

  const handlePreviousPage = () => {
    setStartIndex(startIndex-1);
    setEndIndex(endIndex-1);
    if(edges.length === totalCount && endIndex === edges.length){
      setEndIndex(endIndex-2);
    }
  };

  return (
    <>
      <nav className='border-b-2 categoryNav border-gray-500'>
        <ul className='flex justify-around'>
          <button disabled={startIndex === 0 || loadingSlider } onClick={handlePreviousPage}> {"<"}</button>
          
          {    
                edges.map(({ node },i) =>
                  { 
                    if(startIndex === 0 && edges.length === 2){
                       if(i===0){
                        return(
                          <>
                          <li className='cursor-pointer'>All</li>
                          <li className='cursor-pointer' key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                          </>
                        )
                       }
                       else{
                        return(
                          <li className='cursor-pointer' key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                        )
                       }
                
                    }
                    else if(startIndex === 0 && edges.length > 2 && i <= endIndex ){
                      if(i===0){
                        return(
                          <>
                          <li className='cursor-pointer'>All</li>
                          <li className='cursor-pointer' key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                          </>
                        )
                       }
                       else{
                        return(
                          <li className='cursor-pointer' key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                        )
                       }
                   
                    }
                    else if(i <= endIndex && i >= startIndex-1){
                      // console.log(endIndex);
                      // console.log(edges.length)
                   
                      return(
                        <li className='cursor-pointer' key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                      )
                    }
                    else{
                      return null;
                    }
                  }
              
                )
          }
          <button disabled={endIndex === edges.length || loadingSlider} onClick={handleNextPage}> {">"}</button>
        </ul>
      </nav>
      <main>

      </main>
    </>
  )
}
