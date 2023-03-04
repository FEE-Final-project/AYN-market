import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/LogIn" element={<LogIn/>} />
      <Route path="/SignUp" element={<SignUp/>} />
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default App
