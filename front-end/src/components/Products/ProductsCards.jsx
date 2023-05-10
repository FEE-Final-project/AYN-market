import React,{useState} from 'react'

import { useFetchProductsApi } from '../../hooks/useAdminQueries';

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import './Product.css'

const PAGE_SIZE = 4;

export default function ProductsCards({categoryName , productName}) {
  
  const { data: productData, loading: productLoading, error: productError, fetchMore } = useFetchProductsApi({category:categoryName , search:productName , first: PAGE_SIZE});
   
  if (productLoading) return <LoadingComponent />;
  if (productError) return <p>{error.message} </p>;

  const { edges, pageInfo ,totalCount } = productData.productList;
  console.log(edges)
  console.log(pageInfo)

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
        <div>
          {edges.map(({node}) => <div>
            {node.productName}
          </div>)}
        </div>

       {pageInfo.hasNextPage && <button onClick={handleFetchingMoreProducts}>Load more</button>}

      </main>
    </>
  )
}
