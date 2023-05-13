import React,{useState} from 'react'

import { useFetchProductsApi } from '../../hooks/useAdminQueries';
import ProductCard from "./ProductCard";
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import './Product.css'

const PAGE_SIZE = 9;

export default function ProductsCards({categoryName , productName}) {
  
  const { data: productData, loading: productLoading, error: productError, fetchMore } = useFetchProductsApi({category:categoryName , search:productName , first: PAGE_SIZE});
   
  if (productLoading) return <LoadingComponent />;
  if (productError) return <p>{error.message} </p>;

  const { edges, pageInfo ,totalCount } = productData.productList;


  const handleFetchingMoreProducts = async () => {
    await fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.productList.edges;
        return {
          productList: {
            edges: [...prevResult.productList.edges,...newEdges],
            pageInfo: fetchMoreResult.productList.pageInfo,
            totalCount: fetchMoreResult.productList.totalCount,
            __typename: prevResult.productList.__typename,
          }
        }
      }
    })
  }

  return (
    <>
      <main>
        {totalCount === 0 && <p className="text-center text-2xl bg-red-500 p-5 rounded  text-white  my-10">No products found</p>}
        <div className='lg:flex lg:flex-wrap lg:justify-around lg:items-center'>
          {edges.map(({node},i) => 
            <ProductCard key={node.id}  product={node} />
          )}
        </div>
       <div className='flex flex-col items-center'>
         {pageInfo.hasNextPage && <button className='bg-gray-200  hover:bg-gray-300 mb-5 text-gray-800  font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={handleFetchingMoreProducts}>Load more</button>}
      </div>
      </main>
    </>
  )
}
