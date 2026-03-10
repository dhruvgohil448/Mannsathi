import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Options from '../../components/Options/Options'
import AppDownload from '../../components/AppDownload/AppDownload'
import Footer from '../../components/Footer/Footer'

const Home = ({ setShowLogin }) => {
  return (
    <div>
      {/* <Navbar/> */}
      <Header/>
      <Options setShowLogin={setShowLogin} />
      <AppDownload/>
      <Footer/>
    </div>
  )
}

export default Home
