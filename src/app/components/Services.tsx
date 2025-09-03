'use client'
import React from 'react'
import Image, { StaticImageData } from 'next/image'


import frontendIcon from '@/app/assets/web-icon.png'
import uiuxIcon from '@/app/assets/mobile-icon.png'
import figmaIcon from '@/app/assets/ui-icon.png'
import mentoringIcon from '@/app/assets/graphics-icon.png'
import rightArrow from '@/app/assets/right-arrow.png'
type Service = {
  icon: StaticImageData;
  title: string;
  description: string;
  link: string;
}

const serviceData: Service[] = [
  {
    icon: frontendIcon,
    title: 'Frontend Development',
    description: 'Create responsive websites using HTML, CSS, JS, React, and Tailwind CSS.',
    link: '#work'
  },
  {
    icon: uiuxIcon,
    title: 'UI/UX Design',
    description: 'Designing clean and user-friendly interfaces using Figma.',
    link: '#about'
  },
  {
    icon: figmaIcon,
    title: 'Prototyping',
    description: 'Turning static designs into interactive website prototypes using Figma for smooth user flow testing.',
    link: '#about'
  },
  {
    icon: mentoringIcon,
    title: 'Photo Editing',
     description: 'Enhancing travel and portrait photos using Adobe Lightroom with a clean, natural, and aesthetic style.',
    link: '#contact'
  }
]

const Services: React.FC = () => {
  return (
    <div id='services' className='w-full px-[12%] py-10 pb-32 scroll-mt-20 bg-white text-gray-800 dark:bg-slate-800 dark:text-white' >
      <h2 className='text-center text-5xl font-Outfit'>Things I Can Do</h2>

      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Outfit dark:text-white text-gray-600'>
        &quot;Here are the main things I love to do — from building websites to designing clean user interfaces. I&apos;m always exploring and learning new tools to improve my work.&quot;
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 dark:text-white my-10'>
        {serviceData.map(({ icon, title, description, link }, index) => (
          <div key={index} className='border border-gray-400 rounded-lg dark:hover:bg-slate-600 px-8 py-12 dark:hover:shadow-[4px_4px_0px_#fffff hover:shadow-[4px_4px_0px_#000000] cursor-pointer hover:bg-violet-100 hover:-translate-y-1 duration-500'>
            <Image src={icon} alt={title} className='w-10' />
            <h3 className='text-lg my-4 text-gray-700 dark:text-white'>{title}</h3>
            <p className='text-sm text-gray-600 leading-5 dark:text-white'>{description}</p>
            <a href={link} className='flex items-center gap-2 text-sm mt-5 '>
              Read more <Image src={rightArrow} alt='arrow' className='w-4' />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services