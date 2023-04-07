
import { createContext, useReducer , useEffect } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })
  useEffect(()=>{
    const user = cookies.get('user')
    if(user){
      dispatch({type:"LOGIN" , payload:user})
    }
  },[])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}
