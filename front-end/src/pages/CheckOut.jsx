import React, {  useState , useEffect } from 'react'

import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { usePaymentContext } from '../hooks/usePaymentContext';

import TokenStorage from '../services/TokenStorage.service';

import { useUserMutations } from '../hooks/useUserMutations';

import toast ,{Toaster} from 'react-hot-toast';

//import for styling
import "./pages.css"



export default function CheckOut() {
  const phoneRegex = /^01[0125][0-9]{8}$/;
  
  const {createOrderApi} = useUserMutations();

  const [loading ,setLoading] = useState(false);
  const {user} =useAuthContext()
  const{cartId} = usePaymentContext();
 
  const {username,email,phone} = user;


  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
   email,
   name:username,
   firstName: username,
   lastName: "",
   addressLine1: "",
   addressLine2: "",
   phone,
   phoneNumber:phone,
   orderNote:"",
   cartId:cartId,
  });


 
  const [formError, setFormError] = useState("");
  
  useEffect (()=>{
    if(!user){
      navigate("/")
    }
  })

  function handleChange(e) {
   if(e.target.name === "firstName" || e.target.name === "lastName"){
      if(e.target.value.length < 3){
        setFormError("Username must be at least 3 characters long");
      }
      else{
        setFormError("")
      }
   }
   else if(e.target.name === "phoneNumber"){
        if(!phoneRegex.test(e.target.value)){
            setFormError("Please enter a valid phone number");
        }
        else{
            setFormError("")
        }
    }
  else if(e.target.name === "addressLine1"){
    if(e.target.value.length < 10){
        setFormError("Address line 1 must be at least 10 characters long");
    }
    else{
        setFormError("")
    }
    }

    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

async function handleSubmit(e) {
    e.preventDefault();
    if(formError){
      return;
    }
   setLoading(true);

    try{
         console.log(userData)
        const response = await createOrderApi(userData);
        console.log(response)
        if(response.data.createOrder.success){
      
            setUserData({
              email,
              firstName: username,
              lastName: "",
              name:username,
              addressLine1: "",
              addressLine2: "",
              phone,
              phoneNumber:phone,
              orderNote:"",
              cartId,
            });
      
            setFormError('');
            TokenStorage.setOrderId(response.data.createOrder.order.id);
            navigate("/payment");
        }
       else{
        setFormError(response.data.createOrder.errors[0]);
       }
  
    }
    catch(error){
        setFormError(error.message);
        setLoading(false);
    }

    setLoading(false);  
  }
  
  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 
      sm:px-6 lg:px-8 z-50 
      mt-20
      mb-28">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Create new order
            </h2>

            {formError && <p className="text-red-100 bg-red-900 rounded mt-4 p-2 text-center">{formError}</p> }
        
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px  shadow-sm">
              <div className='flex mb-2'>
                <h2 className='mr-3'>
                 Your Email address
                </h2>
                <p className='text-gray-500 font-extrabold'>{email}</p>
              </div>
              <div>
                <label htmlFor="firstName" className="sr-only">
                  user first name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  type="text"
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Write your first Name "
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  user last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  type="text"
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Write your last Name "
                  onChange={handleChange}
                />
              </div>
            
              <div>
                <label htmlFor="phoneNumber" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={userData.phoneNumber}
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your phone number (default is your account phone number)"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="addressLine1" className="sr-only">
                  Address line 1
                </label>
                <input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  value={userData.addressLine1}
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your address line 1"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="addressLine2" className="sr-only">
                  Address line 2
                </label>
                <input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  value={userData.addressLine2}
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your address line 2 optional"
                  onChange={handleChange}
                />
              </div>
              <div>
              <label htmlFor="orderNote" className='sr-only' >order notes</label>
              <textarea id="orderNote" name="orderNote"   className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder='add your order notes here'  value={userData.orderNote} onChange={handleChange} cols="30" rows="5" ></textarea>
  
              </div>
              
          
            </div>
            <div>
              {loading ?  
               <button
               disabled
               className="group relative flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white"
             >
               Creating your order...
             </button>
              : <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                pay now
              </button>
              }
    
            </div>
          </form>
        </div>
      </div>
      <Toaster
          position="top-center"
          reverseOrder={false}
        />
    </>
  )

}
