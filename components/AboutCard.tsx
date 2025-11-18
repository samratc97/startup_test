'use client'

import { AnimatedElement } from "@/components/AnimatedElement"
import { motion } from 'framer-motion'
import { Target, Eye, Sparkles, TrendingUp, Rocket, Users } from 'lucide-react'
import Image from "next/image";

interface AboutCardProps {
  className: string;
}

export default function AboutCard(className: AboutCardProps) {
  return (
    <div className={`${className.className}`}>
      {/* Mission Section */}
      <AnimatedElement>
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white py-16 md:py-20">
          {/* Decorative Background Elements */}
          <div className="absolute top-10 right-10 opacity-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-32 h-32" />
            </motion.div>
          </div>
          <div className="absolute bottom-10 left-10 opacity-5">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-24 h-24" />
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 lg:w-5/12"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-black p-2 rounded-2xl shadow-xl">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        className="w-full h-full"
                        src="https://www.youtube-nocookie.com/embed/9EKujF0CJok?rel=0&modestbranding=1&controls=1"
                        title="Discover the Breathtaking Beauty of ICFAI University Tripura from Above"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-1/2 lg:w-7/12"
              >
                <div className="relative">
                  {/* Icon Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="inline-block mb-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Our{" "}
                    <span className="relative inline-block">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        Mission
                      </span>
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                    </span>
                  </h2>

                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed pl-6">
                      To establish ICFAI University Tripura as a leading hub for
                      innovation and entrepreneurship, nurturing transformative ideas
                      and ventures that drive societal progress, technological
                      advancement, and economic growth. We envision creating a
                      community of empowered individuals who inspire change, embrace
                      innovation, and lead the way in shaping a sustainable and
                      prosperous future.
                    </p>
                  </div>

                  {/* Feature Pills */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap gap-3 mt-8"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      Innovation Hub
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      <Rocket className="w-4 h-4" />
                      Entrepreneurship
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      <Users className="w-4 h-4" />
                      Community Growth
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Vision Section */}
      <AnimatedElement>
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 py-16 md:py-20">
          {/* Decorative Background Elements */}
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 lg:w-5/12"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl blur opacity-25  transition duration-500"></div>
                  <div className="relative">
                    <motion.div

                      className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <Image
                        height={400}
                        width={400}
                        className="w-full h-full object-cover z-50"
                        alt="ICFAI University Campus"
                        src="https://sic-files.iutripura.in/static/sic/about/icfai-bg.png"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-1/2 lg:w-7/12"
              >
                <div className="relative">
                  {/* Icon Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="inline-block mb-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg -rotate-3">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Our{" "}
                    <span className="relative inline-block">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
                        Vision
                      </span>
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                    </span>
                  </h2>

                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed pl-6">
                      To foster a vibrant ecosystem of innovation and entrepreneurship
                      at ICFAI University Tripura, empowering students and aspiring
                      entrepreneurs to transform their ideas into impactful solutions.
                      Through mentorship, cutting-edge resources, and collaborative
                      opportunities, we aim to cultivate creativity, drive
                      technological advancements, and contribute to the growth of
                      sustainable startups and a dynamic entrepreneurial culture.
                    </p>
                  </div>

                  {/* Feature Pills */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap gap-3 mt-8"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      Creative Culture
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      <Target className="w-4 h-4" />
                      Impact Solutions
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      Sustainable Growth
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedElement>
    </div>
  )
}
