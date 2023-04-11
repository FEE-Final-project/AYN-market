import React,{useState , useEffect} from 'react'
import { gql, useMutation } from '@apollo/client';
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import Cookies from 'universal-cookie';

//import for styling
import logo from "../assets/logo.svg";
import "./pages.css"

const LOG_IN = gql`
mutation ObtainToken($email: String!, $password: String!) {
  obtainToken(email: $email, password: $password) {
    errors
    success
    refreshToken
    token
    user {
      id
      email
      username
    }
  }
}
`;
export default function LogIn() {
  const navigate = useNavigate();
  const [obtainToken, {loading, error }] = useMutation(LOG_IN);
  const [userData, setUserData] = useState({email:"", password:""});
  const [formError,setFormError] = useState("");

  const { dispatch ,user} = useAuthContext();
 

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })

  function handleChange(e){
    setUserData({...userData, [e.target.name]:e.target.value})
  }


  async function handleSubmit(e){
    try{

      e.preventDefault();
      
      let response = await obtainToken({variables:{email:userData.email , password:userData.password}})
    
     
    if(response.data.obtainToken.success){
     const cookies = new Cookies();
     cookies.set('user', response.data.obtainToken.user, { path: '/' });
     cookies.set('token', response.data.obtainToken.token, { path: '/' });
     dispatch({ type: "LOGIN", payload: response.data.obtainToken.user , token: response.data.obtainToken.token });
     setUserData({
       email: "",
       password: "",
     });
     navigate("/");
     setFormError("");
    }
  
  }
    catch(error){
      setFormError(error.message)
    }

  }
  return (

    <>
    <div className="background">
    <span>🛍</span>
    <span>🎮</span>
    <span>🥋</span>
    <span>💻</span>
    <span>🛠</span>
    <span>📺</span>
    <span>👚</span>
    <span>📸</span>
    <span>💄</span>
    <span>👠</span>
    <span>🎒</span>
    <span>👒</span>
    <span>💍</span>
    <span>👗</span>
    <span>🧦</span>
    <span>🕶</span>
    <span>👖</span>
    <span>☂</span>
    <span>🍴</span>
    </div>
  <div className="flex min-h-full items-center justify-center px-4 py-12 
  sm:px-6 lg:px-8 z-50 
  mt-20
  mb-28">
    <div className="w-full max-w-md space-y-8">
      <div>
        <img
          className="mx-auto h-20 w-auto bg-white rounded-full "
          src={logo}
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Log in to your account
        </h2>
      {formError && <p className="text-red-100 bg-red-900 rounded mt-4 p-2 text-center">{formError}</p> }
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px  shadow-sm">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={userData.email}
              required
              className="relative block mb-3  bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Email address"
              onChange={handleChange}
            />
          </div>
      
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={userData.password}
              required
              className="relative block mb-3 bg-white w-full rounded border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
       
        </div>
       

{/* //TODo:add remember me  */}
        {/* <div className="flex items-center justify-between"> */}
          {/* <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div> */}
        {/* </div> */}

      
        <div>
          {loading ?  
           <button
           disabled
           className="group relative flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white"
         >
           Logging in your account...
         </button>
          : <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Log in
          </button>
          }

        </div>
      </form>
    </div>
  </div>

</>

    
);
  
   
}