'use client'
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import sendIcon from '@/app/assets/send-icon.png'
import rightArrowBold from '@/app/assets/right-arrow-bold.png'
import project1 from '@/app/assets/public/work-1.png'
import project2 from '@/app/assets/public/work-2.png'
import project3 from '@/app/assets/public/work-3.png'
import project4 from '@/app/assets/public/work-4.png'

type Work = {
  title: string;
  description: string;
  bgImage: StaticImageData;
}

const workData: Work[] = [
  {
    title: 'Department Website',
    description: 'Responsive website built with React & Tailwind.',
    bgImage: project1,
    // link: 'https://web-profile-tkj.netlify.app/',
  },
  {
    title: 'Landing Page',
    description: 'Modern and minimalist landing page.',
    bgImage: project2,
    // link: 'https://67ab133e456c5f95b0a2f384--vermillion-kelpie-1e3f99.netlify.app/',
  },
  {
    title: 'UI Design',
    description: 'Interface design web using Figma.',
    bgImage: project3,
    // link: 'https://www.figma.com/design/MonfvuPRs4FQ7wm8oAzJjG/Untitled?node-id=4-66&p=f&t=uO2a2SJy7hHNZikQ-0', 
  },
  {
    title: 'Game',
    description: 'simple game using Scratch.',
    bgImage: project4,
    // link: 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted', 
  },
]

const Work: React.FC = () => {
  return (
    <div id='work' className='w-full px-[12%] py-10 scroll-mt-20 dark:bg-slate-800 text-white'>
      <h4 className='text-center mb-2 text-lg font-Outfit'>My portfolio</h4>
      <h2 className='text-center text-5xl font-Outfit'>My latest work</h2>
      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Outfit'>
        Welcome to my web development portofolio! Explore a collection of projects 
        showcasing my expertise in front-end development.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-5'>
        {workData.map((project, index) => (
          <div
            key={index}
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'
            style={{ backgroundImage: `url(${project.bgImage.src})` }}
          >
            <div className='bg-white w-10/12 shadow-lg rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
              <div>
                <h2 className='font-semibold text-gray-700 dark:text-slate-800'>{project.title}</h2>
                <p className='text-sm text-gray-700'>{project.description}</p>
              </div>
              <div className='border rounded-full border-black w-13 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'>
                <Image src={sendIcon} alt='send icon' className='w-8' />
              </div>
            </div>
          </div>
        ))}
      </div>

      <a href='#' className='w-max flex items-center justify-center gap-2 dark:bg-white text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-violet-100 duration-500'>
        Show more <Image src={rightArrowBold} alt='Right arrow' className='w-4' />
      </a>
    </div>
  )
}

export default Work