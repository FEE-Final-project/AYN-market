import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import { useAuthApi } from '../hooks/useAuthApi'
import { useNavigate } from 'react-router-dom';
import toast ,{Toaster} from 'react-hot-toast';

import "./pages.css"

export default function EmailConfirm() {
  const{uid} = useParams()
  const{token} = useParams()
  const {emailConfirmApi} = useAuthApi()
  const navigate = useNavigate()
  const [confirmed , setConfirmed] = useState(false)

  const confirmEmail = async () => {
   const res = await emailConfirmApi({uid,token})
 
   if(res.data.emailConfirm.success){
       setConfirmed(true)
   }

   else{
        toast.error("There is something went wrong try again later")
        setConfirmed(false)
    }
    }

  return (
    <div className='flex items-center justify-center flex-col confirmEmailContainer p-60 m-2 rounded'>
     <Toaster
             position="top-center"
             reverseOrder={false}
            />
    <h1 className='my-5 text-white font-mono text-2xl'>{ confirmed ? "Your email activated successfully you can log in " :"Confirm Your Email by clicking the button below "}</h1>
    {
        confirmed ?  <button className='bg-blue-700 p-4 w-50 text-white rounded font-mono hover:bg-blue-500' onClick={()=>navigate("/LogIn")}>
        go to login page
       </button>
       :  <button className='bg-gray-500 p-4 w-50 text-white rounded font-mono hover:bg-gray-400' onClick={confirmEmail}>
       confirm my email
      </button>
    }
    </div>
  )
}
