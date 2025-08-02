'use client'
import React from 'react'
import Image from 'next/image'
import mailIcon from '@/app/assets/mail_icon.png'
import logo from '@/app/assets/logo.png'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center py-16">
          <Image src={logo} alt="logo" className="w-24 mx-auto mb-3" />
          <div className="flex items-center justify-center gap-3 text-gray-900">
            <Image src={mailIcon} alt="mail" className="w-5 h-4" />
            <span className="text-lg">27erlinariani@gmail.com</span>
          </div>
        </div>
        
       
        <div className="border-t border-gray-500"></div>
        
      
        <div className="flex justify-between items-center py-8">
          <p className="text-gray-700">© 2025 Erlin Ariani. All rights reserved.</p>
          <div className="flex gap-8">
            <a 
              href="https://github.com/erlinarianii" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.instagram.com/erlinarianii" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://x.com/jefrianii" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer