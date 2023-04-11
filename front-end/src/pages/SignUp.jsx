import React, {  useState , useEffect } from 'react'
import { gql, useMutation } from '@apollo/client';
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";

//import for styling
import logo from "../assets/logo.svg";
import "./pages.css"


const ADD_USER = gql`
  mutation CreateUser($input:CustomerSignUpInput!) {
    customerSignup(input: $input) {
    success
    errors
    }
  }
`;


export default function SignUp() {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/;
  const {user} =useAuthContext()
  const [customerSignup, {loading, error }] = useMutation(ADD_USER);

  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    password: "",
    passwordConfirmation: "",
    email: "",
    userName: "",
    gender: "",
    phone: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [formError, setFormError] = useState("");
  useEffect (()=>{
    if(user){
      navigate("/")
    }
  })

  function handleChange(e) {
    if(e.target.name === "password"){
      if(!passwordRegex.test(e.target.value)){
        setPasswordError("Password must be at least 8 characters long contain at least  one lowercase letter and one uppercase letter and one special character");
      }
      else{
        setPasswordError("")
      }
    }
    else if(e.target.name === "passwordConfirmation"){
      if(e.target.value !== userData.password){
      setPasswordConfirmationError("Passwords do not match");
      }
      else{
        setPasswordConfirmationError("")
      }
    }
   else if(e.target.name === "email"){
      if(!emailRegex.test(e.target.value)){
        setEmailError("Please enter a valid email address");
      }
      else{
        setEmailError("")
      }
    }
    else if(e.target.name === "phone"){
     if(!phoneRegex.test(e.target.value)){
        setPhoneError("Please enter a valid Egyptian phone number");
      }
     else{
        setPhoneError("")
      }
    }
   else if(e.target.name === "userName"){
      if(e.target.value.length < 3){
        setUserNameError("Username must be at least 3 characters long");
      }
      else{
        setUserNameError("")
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
    if(passwordError || passwordConfirmationError || phoneError || emailError || userNameError){
      setFormError("Please fix the errors in the form");
      return;
    }
   let response = await customerSignup({ variables: {input : {password:userData.password,passwordConfirmation:userData.passwordConfirmation,email:userData.email,username:userData.userName,phone:userData.phone}}});
    
    if (error) {
      setFormError(error.message);
      return;
    }
    if (!response.data.customerSignup.success){
      setFormError(response.data.customerSignup.errors[0]);
      return;
    }
    if(response.data.customerSignup.success){
      setUserData({
        password: "",
        passwordConfirmation: "",
        email: "",
        userName: "",
        gender: "",
        phone: "",
      });
      setFormError('');
      navigate('/login');
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
              Create new account
            </h2>

            {formError && <p className="text-red-100 bg-red-900 rounded mt-4 p-2 text-center">{formError}</p> }

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px  shadow-sm">
            {emailError && <p className="text-red-100 bg-red-900 rounded  p-2 text-center">{emailError}</p>}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  autoComplete="email"
                  required
                  className="relative block mb-3  bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              {userNameError && <p className="text-red-100 bg-red-900 rounded  p-2 text-center">{userNameError}</p>}
              <div>
                <label htmlFor="userName" className="sr-only">
                  user userName
                </label>
                <input
                  id="userName"
                  name="userName"
                  value={userData.userName}
                  type="text"
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Write your Name "
                  onChange={handleChange}
                />
              </div>
              {phoneError && <p className="text-red-100 bg-red-900 rounded  p-2 text-center">{phoneError}</p>}
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={userData.phone}
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                />
              </div>
              {passwordError && <p className="text-red-100 bg-red-900 rounded  p-2 text-center">{passwordError}</p>}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  autoComplete="current-password"
                  required
                  className="relative block mb-3 bg-white w-full rounded border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={handleChange}
                />
               
              </div>
              {passwordConfirmationError && <p className="text-red-100 bg-red-900 rounded  p-2 text-center">{passwordConfirmationError}</p>}
              <div>
                <label htmlFor="passwordConfirmation" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  value={userData.passwordConfirmation}
                  required
                  className="relative block  bg-white w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset 
                  focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              {loading ?  
               <button
               disabled
               className="group relative flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white"
             >
               Creating your account...
             </button>
              : <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Sign Up
              </button>
              }
    
            </div>
          </form>
        </div>
      </div>
    </>
  )

}