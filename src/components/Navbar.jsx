import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = ['Home', 'Features', 'Benefits', 'Pricing', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-void/70 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <img className='w-20' src="logo.png" alt="" />
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <button className="text-sm font-medium bg-white text-void rounded-full px-5 py-2 hover:bg-white/90 transition-colors">
          Get Lume
        </button>
      </nav>
    </motion.header>
  )
}
