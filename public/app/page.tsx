// page.tsx atau layout utama
'use client'
import React from 'react'

// Import semua komponen

import Header from './components/Header'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Nabvar'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
     <Navbar />
      <Header />
      <About />
      <Services />
      <Work />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomePage