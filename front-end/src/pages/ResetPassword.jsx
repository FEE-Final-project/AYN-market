import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthApi } from '../hooks/useAuthApi'
import { useNavigate } from 'react-router-dom';


import "./pages.css"

export default function EmailConfirm() {
    const { uid } = useParams()
    const { token } = useParams()
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/;

    const [userData, setUserData] = useState({
        password: "",
        passwordConfirmation: "",
    });

    const [formError, setFormError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

    const navigate = useNavigate()
    const [confirmed, setConfirmed] = useState(false)

    const [loading, setLoading] = useState(false);

    const { resetPasswordConfirmApi } = useAuthApi()

    function handleChange(e) {
        if (e.target.name === "password") {
            if (!passwordRegex.test(e.target.value)) {
                setPasswordError("Password must be at least 8 characters long contain at least  one lowercase letter and one uppercase letter and one special character");
            }
            else {
                setPasswordError("")
            }
        }
        else if (e.target.name === "passwordConfirmation") {
            if (e.target.value !== userData.password) {
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

        const response = await resetPasswordConfirmApi({ uid, token, newPassword1: userData.password, newPassword2: userData.passwordConfirmation })

        if (response.data.resetPasswordConfirm.success) {
            setConfirmed(true)
            setUserData({
                password: "",
                passwordConfirmation: "",

            });
            setFormError('');
        }
        else {
            setFormError("Something went wrong try again later")
            setConfirmed(false)
        }

        setLoading(false);
    }



    return (
        <div className='w-full'>
           
            {
                confirmed ? <div className='flex items-center justify-center flex-col confirmEmailContainer p-60 m-2 rounded'>
                    <h1 className='my-5 text-white font-mono text-2xl'>Your password has changed successfully</h1>
                    <button className='bg-blue-700 p-4 w-50 text-white rounded font-mono hover:bg-blue-500' onClick={() => navigate("/LogIn")}>
                        go to login page
                    </button>
                </div>
                    :
                    <>
                        {formError && <p className="text-red-100 bg-red-900 rounded mt-4 p-2 text-center">{formError}</p>}
                        <form className='flex items-center justify-center flex-col confirmEmailContainer p-60 m-2 rounded' onSubmit={handleSubmit}>
                            <h1 className='my-5 text-white font-mono text-2xl'>add your new password</h1>
                            {passwordError && <p className="text-red-100 mb-2 bg-red-900 rounded  p-2 text-center">{passwordError}</p>}
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
                                    className="relative block mb-3 bg-white w-64 rounded border-0 p-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
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
                                    placeholder="Confirm Password"
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
                    </>
            }

        </div>
    )
}
