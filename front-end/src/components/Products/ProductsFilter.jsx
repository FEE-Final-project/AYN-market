import React,{ useState} from 'react'

import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';

import ProductsCards from './ProductsCards';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

import "remixicon/fonts/remixicon.css"
import './Product.css'

let PAGE_SIZE = 2;

export default function ProductsFilter() {

  const { data: categoryData, loading: categoryLoading, error: categoryError, fetchMore } = useFetchCategoriesApi(PAGE_SIZE);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(1);
  const [loadingSlider,setLoadingSlider] = useState(false);
  const [categoryName,setCategoryName] = useState('all');
  const [productName,setProductName] = useState('');
   
  if (categoryLoading) return <LoadingComponent />;
  if (categoryError) return <p>{error.message} </p>;

  
  const { edges, pageInfo ,totalCount } = categoryData.categoryList;
  
  const handleSearch = (e) => {
    setProductName(e.target.value);
  }

  const handleNextPage = async () => {
    setStartIndex(startIndex+1);
    setEndIndex(endIndex+1);
    setLoadingSlider(true);
   
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
      <nav className='block categoryNav lg:flex lg:justify-between'>
        <ul className='flex justify-around items-center  lg:w-11/12'>
          <button  className='bg-gray-900 p-2 rounded-full text-white mb-1 hover:bg-gray-600 '  disabled={startIndex === 0 || loadingSlider } onClick={handlePreviousPage}> {"<"}</button>
          
          {    
                edges.map(({ node },i) =>
                  { 
                    if(startIndex === 0 && edges.length === 2){
                       if(i===0){
                        return(
                          <>
                          <li className={(categoryName==='all' ? "bg-slate-600 text-white p-2 mb-1 rounded" : "")+" "+"cursor-pointer" } onClick={()=>setCategoryName('all')}>All</li>
                          <li className={(categoryName===node.categoryName ? "bg-slate-600 text-white p-2 mb-1 rounded" : "")+" "+"cursor-pointer" }  onClick={()=>setCategoryName(node.categoryName)} key={node.id}>
                            {node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}
                            </li>
                          </>
                        )
                       }
                       else{
                        return(
                          <li className={(categoryName===node.categoryName ? "bg-slate-600 text-white p-2 mb-1 rounded" : "")+" "+"cursor-pointer" } onClick={()=>setCategoryName(node.categoryName)} key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                        )
                       }
                
                    }
                    else if(startIndex === 0 && edges.length > 2 && i <= endIndex ){
                      if(i===0){
                        return(
                          <>
                          <li className={(categoryName==="all" ? "bg-slate-600 text-white p-2 mb-1 rounded" : "")+" "+"cursor-pointer" } onClick={()=>setCategoryName("all")}>All</li>
                          <li className={(categoryName===node.categoryName ? "bg-slate-600 text-white p-2 mb-1 rounded" : "")+" "+"cursor-pointer" } onClick={()=>setCategoryName(node.categoryName)} key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                          </>
                        )
                       }
                       else{
                        return(
                          <li className={(categoryName===node.categoryName ? "bg-slate-600 text-white p-2 mb-1 rounded" : "")+" "+"cursor-pointer" } onClick={()=>setCategoryName(node.categoryName)} key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                        )
                       }
                   
                    }
                    else if(i <= endIndex && i >= startIndex-1){
                     
                      return(
                        <li className={(categoryName===node.categoryName ? "bg-slate-600 text-white p-2 mb-1 rounded" : "")+" "+"cursor-pointer" }onClick={()=>setCategoryName(node.categoryName)} key={node.id}>{node.categoryName.charAt(0).toUpperCase() + node.categoryName.slice(1)}</li>
                      )
                    }
                    else{
                      return null;
                    }
                  }
              
                )
          }
          <button disabled={endIndex === edges.length || loadingSlider} className='bg-gray-900 p-2 rounded-full text-white mb-1 hover:bg-gray-600 ' onClick={handleNextPage}> {">"}</button>
        </ul>
        <aside className='relative mt-5 w-full lg:w-fit lg:mt-0'>
        <input type="text" className="rounded-full w-full lg:w-fit border-2 border-gray-300 bg-white  px-4 focus:outline-none focus:border-blue-500" placeholder='search by name' onChange={handleSearch}  />
        <i className="ri-search-line absolute right-4 top-2"></i>
        </aside>
      </nav>
     <ProductsCards categoryName={categoryName} productName={productName} isCustomer={false} />
  </>
  )
}
