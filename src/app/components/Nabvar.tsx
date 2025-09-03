'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TextAlignRightIcon, Cross1Icon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import { ModeToggle } from './mode-toggle';
import logo from '@/app/assets/logo.png';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

type NavItem = { name: string; href: string };

const navigationItems: NavItem[] = [
  { name: 'Home',     href: '/' },
  { name: 'About',    href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Work',     href: '#work' },
  { name: 'Blog',     href: '#blog' },
  { name: 'Contact',  href: '#contact' },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScroll, setIsScroll] = useState(false);
  const [open, setOpen] = useState(false);

  // Background navbar saat scroll
  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup panel dengan tombol Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);

  // Navigasi konsisten untuk anchor homepage
  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('#')) { router.push('/' + href); return; }
    if (href.startsWith('/#')) { router.push(href); return; }
    router.push(href);
  };

  return (
    <>
      <nav
        className={clsx(
          // baseline utama
          'fixed inset-x-0 top-0 z-50 border-b border-border bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm',
          // layout & spacing
          'px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between',
          // transisi & warna teks
          'transition-colors duration-300 text-slate-900 dark:text-white',
          // efek saat scroll (opsional)
          isScroll && 'shadow-sm'
        )}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('/')}
          aria-label="Home"
          className="flex items-center"
          type="button"
        >
          <Image
            src={logo}
            alt="Logo"
            width={48}
            height={48}
            priority
            className="w-12 h-12 object-contain"
          />
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 bg-white/90 dark:bg-slate-700/80 text-slate-900 dark:text-white px-8 py-3 rounded-full shadow-sm">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-gray-800 dark:text-white font-Outfit hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
                aria-current={
                  pathname === '/' && item.href.startsWith('/#')
                    ? 'page'
                    : pathname === item.href
                    ? 'page'
                    : undefined
                }
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button
            type="button"
            onClick={() => handleNavClick('/#contact')}
            className="hidden lg:flex items-center gap-2 border border-gray-400 text-gray-800  dark:text-white px-6 py-2 rounded-full font-Outfit hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Contact <ArrowTopRightIcon className="size-5 text-slate-700 dark:text-white" />
          </button>
          {/* hamburger */}
          <button
            className="md:hidden p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            type="button"
          >
            <TextAlignRightIcon className="h-7 w-7 text-slate-700  dark:text-white" />
          </button>
        </div>
      </nav>

      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* panel */}
      <aside
        id="mobile-menu"
        className={clsx(
          'fixed z-50 inset-y-0 right-0 w-72 bg-white dark:bg-slate-900 p-6 md:hidden transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={closeMenu}
          aria-label="Close menu"
          type="button"
        >
          <Cross1Icon className="h-5 w-5" />
        </button>

        <ul className="mt-8 space-y-4">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left py-2  text-slate-900 dark:text-white font-Outfit hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
