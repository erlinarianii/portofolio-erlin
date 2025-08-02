'use client'
import React from 'react'
import Image from 'next/image'
import userImage from '@/app/assets/user-image.png'
import educationIcon from '@/app/assets/edu-icon.png'
import locationIcon from '@/app/assets/code-icon.png'
import experienceIcon from '@/app/assets/project-icon.png'
import figmaIcon from '@/app/assets/figma.png'
import vscodeIcon from '@/app/assets/vscode.png'
import gitIcon from '@/app/assets/git.png'

const infoList = [
  { icon: locationIcon, title: 'Languages', description: 'HTML, CSS, JavaScript, Laravel, Next.js, PHP' },
  { icon: educationIcon, title: 'Location', description: 'SMK Negeri 1 Denpasar' },
  { icon: experienceIcon, title: 'Experience', description: 'Built more than 5 projects' }
  // 
]

const tools = [figmaIcon, vscodeIcon, gitIcon]

const About: React.FC = () => {
  return (
    <div id="about" className="w-full px-[12%] py-20 bg-white text-gray-800 dark:bg-slate-800 dark:text-white">
      <h4 className="text-center text-lg mb-2 font-Outfit text-gray-600 dark:text-white">Introduction</h4>
      <h2 className="text-center text-5xl font-Outfit font-bold mb-10">About Me</h2>

      <div className="flex flex-col lg:flex-row items-center gap-16">
        <Image src={userImage} alt="user" className="w-64 sm:w-80 rounded-3xl" />
        <div className="flex-1">
          <p className="mb-10 text-gray-700 dark:text-white font-Outfit leading-relaxed">
            I am a vocational high school student majoring in Software Engineering (RPL). 
            I am passionate about coding and web development, and I&apos;m currently focusing on
             improving my frontend and UI/UX skills. Through school projects and self-learning, 
             I aim to become a full stack developer in the future.
          </p>

          <ul className="grid sm:grid-cols-3 gap-6 mb-10">
            {infoList.map(({ icon, title, description }, i) => (
              <li key={i} className="p-6 bg-gray-50 border border-gray-300 dark:hover:text-white dark:bg-slate-500 rounded-xl hover:-translate-y-1 duration-300 shadow-sm">
                <Image src={icon} alt={title} className="w-7 mb-3 " />
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-white">{description}</p>
              </li>
            ))}
          </ul>

          <h4 className="mb-4 font-Outfit">Tools I Use</h4>
          <ul className="flex gap-4">
            {tools.map((tool, i) => (
              <li key={i} className="w-12 h-12 flex items-center justify-center border border-gray-300 bg-gray-50 rounded-lg">
                <Image src={tool} alt="tool" className="w-6" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About