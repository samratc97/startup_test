'use client'

import { useRef, useEffect } from 'react'
import { getTeamMembers } from '@/actions'
import AboutCard from '@/components/AboutCard'
import { Target, Eye, Users, Award, Lightbulb, HandHeart, Rocket, TrendingUp, Sparkles, Zap, DollarSign, Briefcase, Calendar } from 'lucide-react'
import { motion, useInView, useAnimation } from 'framer-motion'

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: delay,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">About Our Center</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Startup & Incubation
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300"
                style={{
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Center
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              The Startup and Incubation Center at ICFAI University, Tripura,
              fosters entrepreneurial spirit and innovation among students. It
              provides resources, mentorship, and a collaborative environment to
              transform ideas into viable startups. The cell aims to nurture
              creativity and support the development of innovative solutions to
              real-world problems.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 opacity-20"
        >
          <Rocket className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 opacity-20"
        >
          <Lightbulb className="w-16 h-16" />
        </motion.div>
      </section>

      {/* Main About Content */}
      <AboutCard className="py-0" />

      {/* Values Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <Award className="w-32 h-32" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto rotate-3 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These values guide everything we do and shape the way we support our startup community.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl"
                >
                  <Lightbulb className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Innovation</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We foster creative thinking and encourage breakthrough solutions to real-world problems.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl"
                >
                  <HandHeart className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Integrity</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We maintain the highest ethical standards in all our interactions and partnerships.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl"
                >
                  <Users className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Collaboration</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We believe in the power of teamwork and building strong partnerships for success.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl"
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Excellence</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We strive for excellence in everything we do and help our startups achieve their best.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl"
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Impact</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We focus on creating meaningful impact in society through sustainable business solutions.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gradient-to-br from-indigo-50 to-violet-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-100"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl"
                >
                  <Eye className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Vision</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We help entrepreneurs develop clear vision and strategic thinking for long-term success.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto rotate-3 shadow-lg">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive support services designed to help startups succeed at every stage of their journey.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Incubation Program</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">12-18 month structured program</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Dedicated workspace and facilities</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">One-on-one mentorship sessions</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Business development support</span>
                  </motion.li>
                </ul>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="absolute top-10 left-10 opacity-5">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Eye className="w-32 h-32" />
                </motion.div>
              </div>
              <div className="absolute bottom-10 right-10 opacity-5">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Rocket className="w-24 h-24" />
                </motion.div>
              </div>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Funding Support</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Seed funding opportunities</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Investor network connections</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Grant application assistance</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Financial planning guidance</span>
                  </motion.li>
                </ul>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Networking Events</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Monthly entrepreneur meetups</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Industry expert sessions</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Pitch competition events</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Alumni network access</span>
                  </motion.li>
                </ul>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Technical Support</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Technology development guidance</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Product validation support</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Intellectual property assistance</span>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-medium">Market research resources</span>
                  </motion.li>
                </ul>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Success Stories Stats */}

    </div>
  )
}