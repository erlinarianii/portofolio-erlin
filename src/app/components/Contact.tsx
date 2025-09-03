'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import rightArrowWhite from '@/app/assets/right-arrow-white.png'
import bgImage from '@/app/assets/public/footer-bg-color.png'

const Contact: React.FC = () => {
  const [result, setResult] = useState<string>('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult('Sending....')

    const form = event.currentTarget
    const formData = new FormData(form)

    formData.append('access_key', '4c0789a3-7ea1-4cbd-9790-d237de1154d3')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (data.success) {
      setResult('Form Submitted Successfully')
      form.reset()
    } else {
      console.log('Error', data)
      setResult(data.message)
    }
  }

  return (
    <div
      id='contact'
      className='w-full px-[12%] py-10 scroll-mt-20 bg-no-repeat dark:bg-slate-800 dark:text-white bg-center'
      
    >
      <h2 className='text-center text-5xl font-Outfit'>Contact Me</h2>
      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Outfit'>
        I&apos;d love to hear from you! If you have any questions, comments, or
        feedback, please use the form below.
      </p>

      <form onSubmit={onSubmit} className='max-w-2xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10 mb-8'>
          <input
            type='text'
            placeholder='Enter your name'
            required
            className='flex-1 p-3 outline-none border-[0.5px] dark:text-gray-700 border-gray-400 rounded-md bg-white'
            name='name'
          />
          <input
            type='email'
            placeholder='Enter your email'
            required
            className='flex-1 p-3 outline-none border-[0.5px] dark:text-gray-700 border-gray-400 rounded-md bg-white'
            name='email'
          />
        </div>
        <textarea
          rows={6}
          placeholder='Enter your message'
          required
          className='w-full p-4 outline-none border-[0.5px] dark:text-gray-700 border-gray-400 rounded-md bg-white mb-6'
          name='message'
        ></textarea>

        <button
          type='submit'
          className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500'
        >
          Submit <Image src={rightArrowWhite} alt='arrow' className='w-4' />
        </button>

        <p className='mt-4 text-center font-Outfit'>{result}</p>
      </form>
    </div>
  )
}

export default Contact