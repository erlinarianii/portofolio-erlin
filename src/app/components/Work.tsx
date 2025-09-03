'use client'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'
import project1 from '@/app/assets/public/work-1.png'
import project2 from '@/app/assets/public/work-2.png'
import project3 from '@/app/assets/public/work-3.png'
import project4 from '@/app/assets/public/work-4.png'

type Project = {
  title: string
  period?: string
  description: string
  tags: string[]
  image: StaticImageData
  website: string
}

const projects: Project[] = [
  {
    title: 'Departement Website',
    description: 'A platform for freelancers and clients to collaborate and find jobs with helpful filters.',
    tags: ['React JS', 'Tailwind.css'],
    image: project1,
    website: 'https://web-profile-tkj.netlify.app/'
  },
  {
    title: 'Simpel Landing Page',
    description: 'Online courses for programmers covering web dev, data science, and machine learning.',
    tags: ['Bootsrap'],
    image: project2,
    website: 'https://67ab133e456c5f95b0a2f384--vermillion-kelpie-1e3f99.netlify.app/'
  },
  {
    title: 'Design Landing Page',
    description: 'Guide to popular destinations, staycations and restaurants across Bali.',
    tags: ['Figma'],
    image: project3,
    website: 'https://www.figma.com/design/MonfvuPRs4FQ7wm8oAzJjG/Untitled?node-id=4-66&t=DAn3kI2Tr8nRsAWl-0'
  },
  {
    title: 'Simple Fish Game',
    description: 'Showcasing Indonesia’s rich culture and arts from different regions.',
    tags: ['Scratch'],
    image: project4,
    website: 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted'
  }
]

const Work: React.FC = () => {
  return (
    <section id="work" className="w-full bg-muted/10 dark:bg-slate-800 pb-36 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold">My Project</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Here are some of the projects I have worked on recently.
          </p>
        </div>

        {/* 4 kolom di desktop, tetap responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((p, idx) => (
            <article
              key={idx}
              className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10
                         bg-white dark:bg-slate-700 shadow-sm"
            >
              <div className="aspect-video relative">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                {p.period && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{p.period}</p>
                )}
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full px-2.5 py-1 bg-slate-100 text-slate-700
                                 dark:bg-white/10 dark:text-slate-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <Link
                    href={p.website}
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-xl border
                               px-3 py-2 text-sm font-medium bg-gray-600 text-white dark:bg-slate-800 hover:bg-slate-50
                               dark:hover:bg-white/10 transition"
                  >
                    Website
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
