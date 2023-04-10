
import { createContext, useReducer , useEffect } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload ,
        token: action.token
      }
    case 'LOGOUT':
      return { user: null,token:null}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    token:null
  })
  useEffect(()=>{
    const user = cookies.get('user')
    const token = cookies.get('token')
    if(user){
      dispatch({type:"LOGIN" , payload:user, token:token})
    }
  },[])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}
