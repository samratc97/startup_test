'use client'

import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { Bell, Sparkles, AlertCircle, Info, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Notice } from '@/types'

interface NoticeLineProps {
  notices: Notice[]
  speed?: number
}

export default function NoticeLine({ notices, speed = 50 }: NoticeLineProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  if (!notices.length) return null

  const sortedNotices = notices
    .filter(notice => notice.active)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })

  if (!sortedNotices.length) return null

  const getPriorityConfig = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-rose-700',
          icon: AlertCircle,
          gradient: 'from-red-600 via-orange-600 to-pink-600'
        }
      case 'medium':
        return {
          bg: 'bg-yellow-500',
          icon: Zap,
          gradient: 'from-yellow-600 via-amber-600 to-orange-600'
        }
      default:
        return {
          bg: 'bg-green-500',
          icon: Info,
          gradient: 'from-green-600 via-emerald-600 to-teal-600'
        }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative mt-[82px] overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white border-b border-white/10 shadow-lg"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"
              style={{ backgroundSize: '200% 200%' }}
            />
          </div>

          <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              {/* Left Section - Icon and Label */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3 flex-shrink-0"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-white/30 blur-md rounded-full" />
                  <div className="relative bg-white/20 backdrop-blur-sm p-2 rounded-xl border border-white/30 shadow-lg">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                </motion.div>

                <div className="hidden sm:flex flex-col">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-bold tracking-wide flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Latest Updates
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-blue-100"
                  >
                    {currentTime.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </motion.span>
                </div>
              </motion.div>

              {/* Center Section - Scrolling Notices */}
              <div className="flex-1 overflow-hidden mx-4">
                <Marquee
                  speed={speed}
                  gradient={false}
                  pauseOnHover={true}
                  className="py-1"
                >
                  {sortedNotices.map((notice, index) => {
                    const config = getPriorityConfig(notice.priority)
                    const Icon = config.icon

                    return (
                      <div
                        key={notice.id}
                        className="inline-flex items-center mx-2 group"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-200 cursor-pointer shadow-lg"
                        >
                          {/* Priority Indicator */}
                          <div className="relative">
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className={`absolute inset-0 ${config.bg} rounded-full blur-sm`}
                            />
                            <div className={`relative ${config.bg} p-1.5 rounded-full shadow-lg`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                          </div>

                          {/* Notice Text */}
                          <span className="text-sm font-medium text-white group-hover:text-blue-100 transition-colors">
                            {notice.title}
                          </span>

                          {/* Priority Badge */}
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${config.gradient} text-white shadow-md`}>
                            {notice.priority.toUpperCase()}
                          </span>
                        </motion.div>

                        {/* Separator */}
                        {index < sortedNotices.length - 1 && (
                          <span className="mx-4 text-white/40">•</span>
                        )}
                      </div>
                    )
                  })}
                </Marquee>
              </div>

              {/* Right Section - Close Button */}
              {/* <motion.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-200 group"
                aria-label="Close notifications"
              >
                <svg
                  className="w-4 h-4 text-white group-hover:text-blue-100"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button> */}
            </div>
          </div>

          {/* Bottom Shine Effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}