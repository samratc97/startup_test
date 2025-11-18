'use client'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getStartupBySlug, getAllStartups } from '@/actions'
import { ExternalLink, Users, Calendar, ArrowLeft, Globe, Building, Award, Sparkles, TrendingUp, Target, Rocket, Mail, CheckCircle2, Star, X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2 } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Props = {
  params: Promise<{ slug: string }>
}

export default function StartupPage({ params }: Props) {
  const [startup, setStartup] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.8], [2, 0.2])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    const loadStartup = async () => {
      const { slug } = await params
      const data = await getStartupBySlug(slug)
      setStartup(data)
      setLoading(false)
    }
    loadStartup()
  }, [params])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowLeft' && selectedImage > 0) {
        setSelectedImage(selectedImage - 1)
      } else if (e.key === 'ArrowRight' && selectedImage < startup.images.length - 1) {
        setSelectedImage(selectedImage + 1)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, startup])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="w-16 h-16 text-blue-600" />
        </motion.div>
      </div>
    )
  }

  if (!startup) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* <Navbar /> */}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      {/* Back Navigation */}
      <motion.div
        className=" top-18  bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/startups"
            className="inline-flex items-center group"
          >
            <motion.div
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Startups</span>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Hero Section with Parallax */}
      <motion.section
        className="relative pt-12 pb-20"
        style={{ opacity, scale }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Logo Card - Glassmorphic Design */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="sticky top-24 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                {/* Logo with Glow Effect */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-2xl opacity-20" />
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                    <Image
                      src={startup.logo}
                      alt={`${startup.name} logo`}
                      width={200}
                      height={200}
                      className="mx-auto max-w-full h-auto"
                    />
                  </div>
                </motion.div>
                
                {/* Status Badge */}
                <div className="flex justify-center mb-6">
                  <motion.span
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${startup.status === 'active' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                      startup.status === 'incubating' ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white' :
                        'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{startup.status.charAt(0).toUpperCase() + startup.status.slice(1)}</span>
                  </motion.span>
                </div>

                {/* Featured Badge */}
                {startup.featured && (
                  <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold text-sm">Featured Startup</span>
                    </div>
                  </motion.div>
                )}

                {/* Website Button */}
                {startup.website && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <Globe className="w-5 h-5 relative z-10" />
                      <span className="font-semibold relative z-10">Visit Website</span>
                      <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </motion.div>
                )}

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                    >
                      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">Founded</div>
                        <div className="font-semibold text-gray-900">{startup.founded}</div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                    >
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">Team Size</div>
                        <div className="font-semibold text-gray-900">{startup.team.length} members</div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                    >
                      <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-2 rounded-lg">
                        <Building className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">Category</div>
                        <div className="font-semibold text-gray-900">{startup.category}</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Title Section */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
                        {startup.name}
                      </h1>
                      <div className="flex items-center space-x-2">
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Rocket className="w-12 h-12 text-blue-600" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Description Card */}
              <motion.div
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {startup.description}
                </p>
              </motion.div>

              {/* Full Description */}
              {startup.fullDescription && (
                <motion.div
                  className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">About {startup.name}</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {startup.fullDescription}
                  </p>
                </motion.div>
              )}

              {/* Team Members */}
              {startup.team.length > 0 && (
                <motion.div
                  className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-2 rounded-lg">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Meet the Team</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {startup.team.map((member: string, index: number) => (
                      <motion.span
                        key={index}
                        className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-md border border-blue-200"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {member}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Images Gallery */}
      {startup.images && startup.images.length > 0 && (
        <motion.section
          className="py-16 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ y: 50 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-xl rounded-full px-6 py-3 shadow-xl border border-white/20 mb-4">
                <Award className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Gallery
                </h2>
              </div>
              <p className="text-gray-600 mt-2">Showcasing our journey and achievements</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startup.images.map((image: string, index: number) => (
                <motion.div
                  key={index}
                  className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  onClick={() => setSelectedImage(index)}
                >
                  {/* Glass Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent p-[2px] z-10 pointer-events-none">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-black/5 to-transparent" />
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-2xl">
                    <Image
                      src={image}
                      alt={`${startup.name} gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ZoomIn className="w-6 h-6 text-blue-600" />
                      </motion.div>
                    </div>

                    {/* Image Counter Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <motion.div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      >
                        {index + 1} / {startup.images.length}
                      </motion.div>
                    </div>

                    {/* Bottom Info Card */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <p className="text-sm font-bold text-gray-900">{startup.name}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <motion.button
                              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Share2 className="w-4 h-4 text-gray-600" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
              {selectedImage !== null && (
                <motion.div
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4 md:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
                >
                  {/* Close Button */}
                  <motion.button
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 z-[10001] bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full transition-colors group"
                    onClick={() => setSelectedImage(null)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.button>

                  {/* Image Counter */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 z-[10001] bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {selectedImage + 1} / {startup.images.length}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[51] flex items-center space-x-3">
                    <motion.button
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Share"
                    >
                      <Share2 className="w-5 h-5 text-white" />
                    </motion.button>
                    <motion.button
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Download"
                    >
                      <Download className="w-5 h-5 text-white" />
                    </motion.button>
                  </div> */}

                  {/* Navigation Buttons */}
                  {selectedImage > 0 && (
                    <motion.button
                      className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-[10001] bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage(selectedImage - 1)
                      }}
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </motion.button>
                  )}

                  {selectedImage < startup.images.length - 1 && (
                    <motion.button
                      className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-[10001] bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage(selectedImage + 1)
                      }}
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </motion.button>
                  )}

                  {/* Main Image */}
                  <motion.div
                    className="relative w-full max-w-7xl mx-auto z-[10000] px-2 sm:px-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-full flex flex-col items-center justify-center">
                      {/* Image Container with responsive height */}
                      <div className="relative w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] aspect-video rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-black">
                        <Image
                          src={startup.images[selectedImage]}
                          alt={`${startup.name} image ${selectedImage + 1}`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    {/* Image Caption */}
                    <motion.div
                      className="mt-3 sm:mt-4 md:mt-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1 truncate">{startup.name}</h3>
                          <p className="text-white/70 text-xs sm:text-sm">Gallery Image {selectedImage + 1}</p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-white/70 text-xs sm:text-sm">{startup.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Thumbnail Strip */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10000] max-w-4xl w-full px-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                      <div className="flex items-center justify-center space-x-3 overflow-x-auto scrollbar-hide">
                        {startup.images.map((img: string, idx: number) => (
                          <motion.button
                            key={idx}
                            className={`relative flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 md:w-20 md:h-14 rounded-md sm:rounded-lg overflow-hidden transition-all ${idx === selectedImage
                              ? 'ring-2 sm:ring-4 ring-blue-500 ring-offset-1 sm:ring-offset-2 ring-offset-black/50'
                              : 'opacity-50 hover:opacity-100'
                              }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedImage(idx)
                            }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Keyboard Hint - Hidden on mobile */}
                  <div className="hidden sm:block absolute bottom-24 sm:bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-[10000]">
                    <motion.div
                      className="bg-white/5 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-white/50 text-xs">Use ← → keys to navigate • ESC to close</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>


        </motion.section>
      )}

      {/* Call to Action */}
      <motion.section
        className="py-1 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/*  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="relative z-10 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <TrendingUp className="w-16 h-16 mx-auto mb-6" />
              </motion.div>

              <h2 className="text-4xl font-bold mb-4">
                Inspired by {startup.name}?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join our incubation program and turn your innovative ideas into successful businesses like {startup.name}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 font-semibold rounded-xl shadow-xl transition-all duration-300 group"
                  >
                    <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Apply for Incubation</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/startups"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 group"
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                    <span>View More Startups</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>*/}
      </motion.section> 
    </div>
  )
}