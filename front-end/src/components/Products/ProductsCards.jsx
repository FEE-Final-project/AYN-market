import React from 'react'

import { useFetchProductsApi } from '../../hooks/useAdminQueries';
import ProductCard from "./ProductCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import './Product.css'
import noMoreProducts from "../../assets/noMoreProducts.svg"

const PAGE_SIZE = 9;

export default function ProductsCards({categoryName , productName ,isCustomer , priceLt , priceGt , price}) {
  
  const { data: productData, loading: productLoading, error: productError, fetchMore } = useFetchProductsApi({category:categoryName , search:productName , first: PAGE_SIZE , priceLt:priceLt , priceGt:priceGt , price:price});
  
  
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

        {isCustomer ? <>
         <InfiniteScroll
          dataLength={edges.length}
          next={handleFetchingMoreProducts}
          hasMore={pageInfo.hasNextPage}
          loader={false}
          endMessage={
          totalCount !==0 &&  <p className='text-center text-2xl bg-blue-500  p-5 rounded  my-10'>
              <p className='mb-2 text-white'>There is no more products to show</p>
              <img src={noMoreProducts} alt="no more products" className='w-1/2 mx-auto' />
            </p>
          }
         >
        <div className='lg:flex lg:flex-wrap lg:justify-around lg:items-center'>
          {edges.map(({node}) => 
            <ProductCard key={node.id}  product={node} isCustomer={isCustomer} />
          )}
        </div>
         </InfiniteScroll>
        </> :<>
      
        <div className='lg:flex lg:flex-wrap lg:justify-around lg:items-center'>
          {edges.map(({node}) => 
            <ProductCard key={node.id}  product={node} isCustomer={isCustomer} />
          )}
        </div>
       <div className='flex flex-col items-center'>
         {pageInfo.hasNextPage && <button className='bg-gray-200  hover:bg-gray-300 mb-5 text-gray-800  font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={handleFetchingMoreProducts}>Load more</button>}
      </div>
        </>}
      </main>
    </>
  )
}
