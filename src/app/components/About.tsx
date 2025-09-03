'use client'
import React from 'react'
import Image, { StaticImageData } from 'next/image'

// assets lokal yang sudah ada
import userImage from '@/app/assets/user-image.png'
import educationIcon from '@/app/assets/edu-icon.png'
import locationIcon from '@/app/assets/code-icon.png'
import experienceIcon from '@/app/assets/project-icon.png'
import figmaIcon from '@/app/assets/figma.png'
import vscodeIcon from '@/app/assets/vscode.png'
import gitIcon from '@/app/assets/git.png'

type Info = { icon: StaticImageData; title: string; description: string }
type Tool = { icon: StaticImageData | string; name: string; href: string }

const infoList: Info[] = [
  // { icon: locationIcon,  title: 'Languages',  description: 'HTML, CSS, JavaScript, Laravel, Next.js, PHP' },
  { icon: educationIcon, title: 'Location',   description: 'SMK Negeri 1 Denpasar' },
  { icon: experienceIcon,title: 'Experience', description: 'Built more than 5 projects' },
]

// ✅ campuran lokal (PNG project) + remote (CDN)
  const tools: Tool[] = [
  { icon: figmaIcon,  name: 'Figma',  href: 'https://www.figma.com/' },
  { icon: vscodeIcon, name: 'VS Code', href: 'https://code.visualstudio.com/' },

  // remote icons via devicon CDN
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',   name: 'GitHub',   href: 'https://github.com/' },
  // { icon: 'https://cdn.simpleicons.org/nextdotjs/000000', name: 'Next.js', href: 'https://nextjs.org/' },
  // { icon: 'https://cdn.simpleicons.org/react/61DAFB',     name: 'React',   href: 'https://react.dev/' },
  //  { icon: 'https://cdn.simpleicons.org/tailwindcss/38BDF8', name: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { icon: 'https://cdn.simpleicons.org/mysql/4479A1',     name: 'MySQL',   href: 'https://www.mysql.com/' },
  { icon: 'https://cdn.simpleicons.org/canva/00C4CC',     name: 'Canva',   href: 'https://www.canva.com/' },
]
 


const techStack = [
  'HTML','CSS','JavaScript','TypeScript','React','Next.js','Tailwind CSS','Laravel','PHP'
]

export default function About() {
  return (
    <section id="about" className="w-full scroll-mt-28 pb-32 bg-white text-slate-900 dark:bg-slate-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold">About Me</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Quick intro, favorite tools, and the tech I work with.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Photo */}
          <div className="relative mx-auto lg:mx-0 max-w-[380px] xl:max-w-[470px] w-full">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 blur-2xl pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-200/70 dark:ring-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
              <Image src={userImage} alt="Profile" className="w-full h-auto object-cover" priority />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            <p className="leading-relaxed text-slate-700 dark:text-slate-200">
              I am a vocational high school student majoring in Software Engineering (RPL).
              I love building on the web and I&apos;m currently sharpening my frontend and UI/UX skills.
              Through school projects and self-learning, I aim to become a full stack developer in the future.
            </p>

            {/* Info cards */}
            <ul className="grid sm:grid-cols-3 gap-4">
              {[
                ...[{ icon: educationIcon, title: 'Location', description: 'SMK Negeri 1 Denpasar' },
                    { icon: experienceIcon, title: 'Experience', description: 'Built more than 5 projects' }],
              ].map(({icon,title,description},i)=>(
                <li key={i} className="group relative rounded-2xl p-5 bg-slate-50/70 dark:bg-white/5 ring-1 ring-slate-200 dark:ring-white/10 hover:ring-slate-300 hover:dark:ring-white/20 transition">
                  <Image src={icon} alt={title} className="w-7 h-7 mb-3 opacity-80 group-hover:opacity-100" />
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
                </li>
              ))}
            </ul>

            {/* Tech stack */}
            <div>
              <h4 className="mb-3 font-semibold">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t)=>(
                  <span key={t} className="text-xs md:text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-100 ring-1 ring-slate-200 dark:ring-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4 className="mb-3 font-semibold">Tools I Use</h4>
              <ul className="flex flex-wrap gap-4">
                {tools.map((tool)=>(
                  <li key={tool.name} className="relative group">
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="w-12 h-12 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/10 flex items-center justify-center hover:shadow-sm transition"
                      aria-label={tool.name}
                      title={tool.name}
                    >
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        className="w-6 h-6"
                        width={24}
                        height={24}
                        // ⬇ remote logos don’t need domain whitelist if unoptimized
                        unoptimized={typeof tool.icon === 'string'}
                      />
                    </a>
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-slate-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                      {tool.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
