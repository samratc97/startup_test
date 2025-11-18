'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles, Rocket, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedElement } from './AnimatedElement'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Startups', href: '/startups' },
  { name: 'Events', href: '/events' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
        : 'bg-white shadow-md border-b border-gray-100'
        }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div

                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                <img
                  src="/logo.png"
                  className="h-12 md:h-14 relative z-10"
                  alt="logo"
                />
              </motion.div>

              <div className=" lg:block">
                <div className="font-bold text-base xl:text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">
                  Startup and Incubation Center
                </div>
                <div className="text-[11px] text-gray-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  The ICFAI University, Tripura
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Center Logo (Hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute left-1/2 transform -translate-x-1/2 hidden xl:flex"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              <Image
                src="/ICFAI_University_Tripura.png"
                alt="The ICFAI University, Tripura"
                width={64}
                height={64}
                className="w-16 h-16 relative z-10"
              />
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item, index) => (
                <AnimatedElement
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    className={`relative text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group overflow-hidden`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-50 to-sky-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-600 group-hover:w-full transition-all duration-300"></div>


                  </Link>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:hidden"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-700 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-200/50"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`group flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {isActive(item.href) && (
                          <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Rocket className="w-4 h-4" />
                          </motion.span>
                        )}
                        {item.name}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive(item.href) ? 'translate-x-1' : 'group-hover:translate-x-1'
                        }`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="px-4 pb-4 pt-2 border-t border-gray-200"
              >
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>Empowering Innovation</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.nav>
  )
}