import React,{useEffect, useState} from 'react'
import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';
import logo from "../../assets/logo.png"

const PAGE_SIZE = 3;

export default function CategorySlider() {
    const [afterCursor, setAfterCursor] = useState(null);
    const [beforeCursor, setBeforeCursor] = useState(null);
    const {data , loading ,error  } = useFetchCategoriesApi(PAGE_SIZE , PAGE_SIZE , afterCursor , beforeCursor);

    // useEffect(()=>{
     
    // },[])

      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.message} </p>;
    
      const { edges, pageInfo } = data.categoryList;

      // console.log(pageInfo)
      // console.log(afterCursor)
      // console.log(beforeCursor)
      
      const handlePrevClick = () => {
          setAfterCursor(null);
          setBeforeCursor(pageInfo.startCursor);
      };
   
      const handleNextClick = () => {
        setAfterCursor(pageInfo.endCursor);
        setBeforeCursor(null);
      };
      
      return (
        <div>
          <button disabled={!pageInfo.hasPreviousPage} onClick={handlePrevClick}>
            Prev
          </button>
          <button disabled={!pageInfo.hasNextPage} onClick={handleNextClick}>
            Next
          </button>
          <div className='flex'>
            {edges.map(({ node }) => (
              <div key={node.id}>
                <p>{node.categoryName}</p>
                <p>{node.description}</p>
                <img src={logo} alt="" />
              </div>
            ))}
          </div>
          {/* <button onClick={()=>refetch()}>refetch</button> */}
        </div>
      );

}
