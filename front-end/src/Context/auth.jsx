
import { createContext, useReducer , useEffect } from 'react'
import  TokenStorage from '../services/TokenStorage.service'
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
    user: TokenStorage.getUser() || null,
    token: TokenStorage.getToken || null
  })
  useEffect(()=>{
    const user = TokenStorage.getUser()
    const token = TokenStorage.getToken()
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
