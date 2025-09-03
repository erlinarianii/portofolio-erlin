'use client'
import React from 'react'
import Image from 'next/image'
import profileImg from '@/app/assets/profile-img.png'
import handIcon from '@/app/assets/hand-icon.png'
import rightArrowWhite from '@/app/assets/right-arrow-white.png'
import { DownloadIcon } from '@radix-ui/react-icons'


const Header: React.FC = () => {
  return (
    <div id='home' className="w-full min-h-screen text-slate-900 dark:text-white dark:bg-slate-800 flex flex-col items-center justify-center gap-4">
      <div className="w-11/12 max-w-3xl text-center mx-auto flex flex-col items-center justify-center gap-4">
        <Image src={profileImg} alt="Profile" className="rounded-full w-36" />

        <h3 className="flex items-center gap-2 text-xl md:text-2xl mb-2 font-Outfit">
          Hi! I&apos;m Erlin Ariani
          <Image src={handIcon} alt="Hand Icon" className="w-6" />
        </h3>

        <h1 className="text-4xl sm:text-6xl font-bold font-Outfit">Junior Web Developer</h1>

        <p className="max-w-2xl text-gray-700 font-Outfit px-4 dark:text-white">
          I am a vocational high school student developing myself in coding and web development, with a strong interest in UI/UX and full stack development.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a href="/CV-Erlin-Ariani.pdf" download className="px-10 py-3 border border-gray-400 rounded-full font-Outfit hover:bg-gray-700 transition-colors">
            My CV <DownloadIcon className="inline size-5 ml-1 text-gray-700 dark:text-white" />
          </a>
          <a href="#contact" className="px-10 py-3 bg-black text-white rounded-full font-Outfit hover:opacity-90 flex items-center justify-center gap-2 transition-opacity">
            Contact me <Image src={rightArrowWhite} alt="arrow" className="w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header