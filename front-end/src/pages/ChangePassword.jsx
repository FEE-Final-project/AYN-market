import React,{useState} from 'react'

import { useUserMutations } from '../hooks/useUserMutations';
import { useAuthContext } from '../hooks/useAuthContext';

import toast, { Toaster } from 'react-hot-toast';


export default function ChangePassword() {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/;

    const {user} = useAuthContext()
    const {id} = user
    
    const {updateProfileApi} = useUserMutations()
    
    const [userData, setUserData] = useState({
        oldPassword: "",
        newPassword: "",
        passwordConfirmation: "",
    });

    const [formError, setFormError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("");



    const [loading, setLoading] = useState(false);

   

    function handleChange(e) {
        if (e.target.name === "newPassword") {
            if (!passwordRegex.test(e.target.value)) {
                setPasswordError("Password must be at least 8 characters long contain at least  one lowercase letter and one uppercase letter and one special character");
            }
            else {
                setPasswordError("")
            }
        }
        else if (e.target.name === "passwordConfirmation") {
            if (e.target.value !== userData.newPassword) {
                setPasswordConfirmationError("Passwords do not match");
            }
            else {
                setPasswordConfirmationError("")
            }
        }
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordError || passwordConfirmationError) {
            setFormError("Please fix the errors in the form");
            return;
        }
        setLoading(true);

        const response = await updateProfileApi({ customerId:id , newPassword: userData.newPassword, oldPassword: userData.oldPassword,username:null })
        console.log(response)
        if (response.data.customerUpdate.success) {
            setConfirmed(true)
            setUserData({
                oldPassword: "",
                newPassword: "",
                passwordConfirmation: "",
            });
            toast.success('password changed successfully')
            setFormError('');
        }
        else {
            setFormError(response.data.customerUpdate.errors[0])
            setConfirmed(false)
        }

        setLoading(false);
    }



    return (
        <div className='w-full'>

        <form className='flex items-center justify-center flex-col confirmEmailContainer p-60 m-2 rounded'  onSubmit={handleSubmit} >
        {formError && <p className="text-red-100 bg-red-900 rounded mt-4 p-2 text-center">{formError}</p>}
            <h1 className='my-5 text-white font-mono text-2xl'>Change your password</h1>
            <div>
                <label htmlFor="oldPassword" className="sr-only">
                    Old Password
                </label>
                <input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    value={userData.oldPassword}
                    autoComplete="current-password"
                    required
                    className="relative block mb-3 bg-white w-64 rounded border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Current Password"
                    onChange={handleChange}
                />

            </div>
            {passwordError && <p className="text-red-100 mb-2 bg-red-900 rounded  p-2 text-center">{passwordError}</p>}
            <div>
                <label htmlFor="oldPassword" className="sr-only">
                    New Password
                </label>
                <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={userData.newPassword}
                    autoComplete="current-password"
                    required
                    className="relative block mb-3 bg-white w-64 rounded border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="New Password"
                    onChange={handleChange}
                />

            </div>
            {passwordConfirmationError && <p className="text-red-100 mb-2 bg-red-900 rounded  p-2 text-center">{passwordConfirmationError}</p>}
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
                    className="relative block  bg-white w-64 rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset 
        focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Confirm New Password"
                    onChange={handleChange}
                />
            </div>
            <div className='mt-5'>
                {loading ?
                    <button
                        disabled
                        className="group relative flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white"
                    >
                        updating your password...
                    </button>
                    : <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                        update password
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
