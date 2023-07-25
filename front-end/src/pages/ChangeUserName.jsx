import React,{useState} from 'react'

import { useUserMutations } from '../hooks/useUserMutations';
import { useAuthContext } from '../hooks/useAuthContext';
import  TokenStorage from '../services/TokenStorage.service'

import toast, { Toaster } from 'react-hot-toast';

export default function ChangeUserName() {

    const {user, dispatch ,token} = useAuthContext()
    const {id} = user
    
    const {updateProfileApi} = useUserMutations()
    
    const [userData, setUserData] = useState({
     username: "",
    });

    const [formError, setFormError] = useState("");
  
    const [loading, setLoading] = useState(false);
    
    const [usernameError,setUsernameError] = useState('')
 
       
    function handleChange(e) {
      if (e.target.name === "username" && e.target.value.length < 3) {
       setUsernameError("Username must be at least 3 characters long"); 
      }
        else{
            setUsernameError('')
        }
      setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (usernameError) {
            setFormError("Please fix the errors in the form");
            return;
        }
        setLoading(true);

        const response = await updateProfileApi({ customerId:id , newPassword:null, oldPassword: null ,username:userData.username })
        console.log(response)
        if (response.data.customerUpdate) {
           
            setUserData({
                username: "",
            });
            TokenStorage.storeToken(token);
            TokenStorage.storeUser(response.data.customerUpdate.customer);
            dispatch({ type: "LOGIN", payload:response.data.customerUpdate.customer, token: token});

            toast.success('user name changed successfully')
            setFormError('');
        }
        else {
            setFormError("something went wrong try again later")
           
        }

        setLoading(false);
    }



    return (
        <div className='w-full'>

        <form className='flex items-center justify-center flex-col confirmEmailContainer p-20 m-2 rounded'  onSubmit={handleSubmit} >
        {formError && <p className="text-red-100 bg-red-900 rounded mt-4 p-2 text-center">{formError}</p>}   

            <h1 className='my-5 text-white font-mono text-2xl'>Change your User Name</h1>
            {usernameError && <p className="text-red-100 bg-red-900 rounded mt-4 p-2 text-center">{usernameError}</p>}
            <div>
                <label htmlFor="username" className="sr-only">
                   User Name
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={userData.username}
                    required
                    className="relative block mb-3 bg-white w-64 rounded border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your new user name"
                    onChange={handleChange}
                />

            </div>
          
            <div className='mt-5'>
                {loading ?
                    <button
                        disabled
                        className="group relative flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white"
                    >
                        updating your user name...
                    </button>
                    : <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                        update user name
                    </button>
                }

            </div>

        </form>
        <Toaster
            position="top-center"
            reverseOrder={false}
            />

        </div>
    )
}
