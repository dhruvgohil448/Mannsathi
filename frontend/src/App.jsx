import { useState } from 'react';
import './App.css'
import Home from './Pages/Home/Home'
import LogMood from './Pages/LogMood/LogMood';
import PersonalizedSuggestions from './Pages/PersonalizedSuggestions/PersonalizedSuggestions';
import ScrollTop from './components/ScrollToTop/ScrollTop'
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    <ToastContainer/>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>}
    <Router>
    <ScrollTop />
      <div className="app">
        <Navbar setShowLogin = {setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
          <Route path="/logMood" element={<LogMood />} />
          <Route path="/personalizedSuggestions" element={<PersonalizedSuggestions />}/>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
