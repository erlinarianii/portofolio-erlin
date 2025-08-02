'use client'
import React from 'react'
import Image from 'next/image'
import profileImg from '@/app/assets/profile-img.png'
import handIcon from '@/app/assets/hand-icon.png'
import downloadIcon from '@/app/assets/download-icon.png'
import rightArrowWhite from '@/app/assets/right-arrow-white.png'

const Header: React.FC = () => {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-4 bg-white text-gray-800">
      <Image src={profileImg} alt="Profile" className="rounded-full w-36" />

      <h3 className="flex items-center gap-2 text-xl md:text-2xl mb-2 font-Outfit">
        Hi! I'm Erlin Ariani
        <Image src={handIcon} alt="Hand Icon" className="w-6" />
      </h3>

      <h1 className="text-4xl sm:text-6xl font-bold font-Outfit">Junior Web Developer</h1>

      <p className="max-w-2xl text-gray-600 font-Outfit px-4">
        I am a vocational high school student developing myself in coding and web development, with a strong interest in UI/UX and full stack development.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <a href="/CV-Erlin Ariani.pdf" download className="px-10 py-3 border border-gray-400 rounded-full font-Outfit hover:bg-gray-100">
          My CV <Image src={downloadIcon} alt="Download Icon" className="inline w-4 ml-2" />
        </a>
        <a href="#contact" className="px-10 py-3 bg-black text-white rounded-full font-Outfit hover:opacity-90 flex items-center gap-2">
          Contact me <Image src={rightArrowWhite} alt="arrow" className="w-4" />
        </a>
      </div>
    </div>
  )
}

export default Header