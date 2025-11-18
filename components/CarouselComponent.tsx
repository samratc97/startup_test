'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CarouselImage } from '@/types'

interface CarouselComponentProps {
  images: CarouselImage[]
  autoPlay?: boolean
  interval?: number
}

export default function CarouselComponent({ 
  images, 
  autoPlay = true, 
  interval = 5000 
}: CarouselComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  const nextSlide = useCallback(() => {
    setDirection('right')
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
    setProgress(0)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setDirection('left')
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
    setProgress(0)
  }, [images.length])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left')
    setCurrentIndex(index)
    setProgress(0)
  }

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && images.length > 1 && !isHovered) {
      const timer = setInterval(nextSlide, interval)
      return () => clearInterval(timer)
    }
  }, [isPlaying, interval, images.length, isHovered, nextSlide])

  // Progress bar
  useEffect(() => {
    if (isPlaying && !isHovered) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0
          return prev + (100 / (interval / 50))
        })
      }, 50)
      return () => clearInterval(progressInterval)
    } else {
      setProgress(0)
    }
  }, [isPlaying, isHovered, interval, currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === ' ') {
        e.preventDefault()
        setIsPlaying(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nextSlide, prevSlide])

  if (!images.length) return null

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0,
      scale: 0.8
    })
  }

  return (
    <div
      className="relative w-full h-64 md:h-96 lg:h-[550px] overflow-hidden rounded-l bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              priority={currentIndex === 0}
            />

            {/* Gradient Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            />
            
            {/* Text Content */}
            {(images[currentIndex].title || images[currentIndex].subtitle) && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute inset-0 flex items-end justify-center pb-16 md:pb-20"
              >
                <div className="text-center text-white px-4 max-w-4xl">
                  {images[currentIndex].title && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative inline-block"
                    >
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
                        {images[currentIndex].title}
                      </h2>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                      />
                    </motion.div>
                  )}
                  {images[currentIndex].subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-base md:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto mt-4"
                    >
                      {images[currentIndex].subtitle}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Decorative Elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-10 opacity-20"
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 md:p-4 rounded-2xl transition-all duration-200 border border-white/20 shadow-xl z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 md:p-4 rounded-2xl transition-all duration-200 border border-white/20 shadow-xl z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
        </>
      )}

      {/* Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 shadow-xl z-10"
      >
        {/* Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white hover:text-blue-300 transition-colors p-1"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current" />
          )}
        </motion.button>

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="flex items-center gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* Outer ring */}
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-white shadow-lg shadow-white/50'
                  : 'bg-white/40 hover:bg-white/60'
                  }`}>
                  {/* Progress ring for current slide */}
                  {index === currentIndex && isPlaying && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="6"
                        cy="6"
                        r="7"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 7}`}
                        strokeDashoffset={`${2 * Math.PI * 7 * (1 - progress / 100)}`}
                        className="transition-all duration-100"
                      />
                    </svg>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Counter */}
        <div className="text-white text-sm font-medium ml-1">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>

      {/* Image Counter Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-sm font-medium shadow-lg z-10"
      >
        {currentIndex + 1} of {images.length}
      </motion.div>

      {/* Progress Bar */}
      {isPlaying && !isHovered && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left rounded-full"
          style={{ width: '100%' }}
        />
      )}
    </div>
  )
}