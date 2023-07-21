import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import { AuthContextProvider } from '../src/Context/auth'
import { PaymentContextProvider } from './Context/payment'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <PaymentContextProvider>
    <App />
    </PaymentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
