'use client'
import React from 'react'
import Image from 'next/image'

import logo from '@/app/assets/logo.png'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 dark:bg-slate-800 dark:text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center py-16">
          <Image src={logo} alt="logo" className="w-24 mx-auto mb-3" />
          <div className="flex items-center justify-center gap-3 text-gray-900">
            <EnvelopeClosedIcon className="size-7 text-slate-800 dark:text-white" />
            <span className="text-lg dark:text-white">27erlinariani@gmail.com</span>
          </div>
        </div>
        
       
        <div className="border-t border-gray-500"></div>
        
      
        <div className="flex justify-between items-center dark:text-white py-8">
          <p className="text-gray-700 dark:text-white">© 2025 Erlin Ariani. All rights reserved.</p>
          <div className="flex gap-8">
            <a 
              href="https://github.com/erlinarianii" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-700 dark:text-white dark:hover:text-slate-300 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.instagram.com/erlinarianii" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-slate-300 transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://x.com/jefrianii" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-slate-300 transition-colors"
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