'use client'
import logo from '@/app/assets/logo.png'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { TextAlignRightIcon } from '@radix-ui/react-icons'
import { Cross1Icon } from '@radix-ui/react-icons'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { ModeToggle } from './mode-toggle' 



const Navbar: React.FC = () => {
  const [isScroll, setIsScroll] = useState(false)
  const sideMenuRef = useRef<HTMLUListElement>(null)

  const openMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }
  }

  const closeMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = 'translateX(16rem)'
    }
  }

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full px-5 lg:px-8 xl:px-[8%] dark:text-white py-4 flex items-center justify-between z-50 transition duration-300 ${isScroll ? 'bg-white/80 shadow-sm dark:bg-slate-700/80 dark:shadow-sm' : 'bg-white dark:bg-slate-700'}`}>
      <a href="#top">
        <Image src={logo} alt="Logo" className="w-12 cursor-pointer" />
      </a>

      <ul className="hidden md:flex items-center gap-8 bg-white/90 dark:bg-slate-700 dark:text-white px-8 py-3  rounded-full shadow-sm">
        <li><a className="text-gray-800 dark:text-white font-Outfit" href="#home">Home</a></li>
        <li><a className="text-gray-800 dark:text-white font-Outfit" href="#about">About</a></li>
        <li><a className="text-gray-800 dark:text-white font-Outfit" href="#services">Services</a></li>
        <li><a className="text-gray-800 dark:text-white font-Outfit" href="#work">Work</a></li>
        <li><a className="text-gray-800 dark:text-white font-Outfit" href="#contact">Contact</a></li>
      </ul>
 
      <div className="flex items-center gap-4">
        <ModeToggle />
        <a href="#contact" className="hidden lg:flex items-center gap-2 border border-gray-400 dark:text-white text-gray-800  px-6 py-2 rounded-full font-Outfit hover:bg-slate-600 transition">
          Contact <ArrowTopRightIcon className="size-5 dark:text-white text-slate-700 " />
        </a>
        <button onClick={openMenu} className="block md:hidden">
          <TextAlignRightIcon  className='text-slate-600 size-8 dark:text-white'/>
        </button>
      </div>

      <ul ref={sideMenuRef} className="fixed top-0 bottom-0 right-0 w-64  dark:bg-slate-700 dark:text-white bg-white py-20 px-10 flex flex-col gap-4 transition duration-500 transform translate-x-64 z-50 shadow-xl">
        <div className="absolute top-6 right-6 cursor-pointer" onClick={closeMenu}>
          <Cross1Icon  className='text-slate-600 size-7 dark:text-white'/>
        </div>
        {['Home', 'About', 'Services', 'Work', 'Contact'].map((text, i) => (
          <li key={i}><a className="text-gray-800 font-Outfit dark:text-white" href={`#${text.toLowerCase()}`} onClick={closeMenu}>{text}</a></li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar