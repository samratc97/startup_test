'use client'

import { useEffect, useState, useRef } from 'react'
import { getAllEvents } from '@/actions'
import EventCard from '@/components/EventCard'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Calendar, Sparkles, Users, Target, Rocket, TrendingUp, Filter, Clock } from 'lucide-react'
import type { Event } from '@/types'

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'past'>('all')

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getAllEvents()
      setEvents(data)
      setLoading(false)
    }
    loadEvents()
  }, [])

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date())
  const pastEvents = events.filter(event => new Date(event.date) <= new Date())

  const filteredEvents = filterType === 'all' ? events :
    filterType === 'upcoming' ? upcomingEvents : pastEvents

  const workshopCount = events.filter(e => e.type === 'workshop').length
  const seminarCount = events.filter(e => e.type === 'seminar').length

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white py-24">
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
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
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
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Events & Workshops</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Empower Your
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
                Entrepreneurial Journey
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Join our community events, workshops, and networking sessions designed to
              accelerate your entrepreneurial journey and connect you with industry experts.
            </motion.p>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-8 h-8 text-green-300" />
                </div>
                <div className="text-3xl font-bold mb-1">{upcomingEvents.length}</div>
                <div className="text-sm text-purple-100">Upcoming Events</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-center mb-2">
                  <Rocket className="w-8 h-8 text-orange-300" />
                </div>
                <div className="text-3xl font-bold mb-1">{workshopCount}</div>
                <div className="text-sm text-purple-100">Workshops</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-pink-300" />
                </div>
                <div className="text-3xl font-bold mb-1">{seminarCount}</div>
                <div className="text-sm text-purple-100">Seminars</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 opacity-20"
        >
          <Sparkles className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 opacity-20"
        >
          <Target className="w-16 h-16" />
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>

            <div className="flex gap-2">
              {(['all', 'upcoming', 'past'] as const).map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setFilterType(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filterType === filter
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <span className="ml-2 text-xs opacity-75">
                    ({filter === 'all' ? events.length :
                      filter === 'upcoming' ? upcomingEvents.length :
                        pastEvents.length})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Clock className="w-12 h-12 text-purple-600" />
          </motion.div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      )}

      {/* Events Grid */}
      {!loading && filteredEvents.length > 0 && (
        <AnimatedSection>
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {filterType === 'all' ? 'All Events' :
                    filterType === 'upcoming' ? 'Upcoming Events' :
                      'Past Events'}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {filterType === 'upcoming'
                    ? 'Join us at our upcoming events and workshops to boost your entrepreneurial journey'
                    : filterType === 'past'
                      ? 'Browse through our previous successful events and workshops'
                      : 'Explore all our events, workshops, and networking sessions'}
                </p>
              </motion.div>

              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* No Events Message */}
      {!loading && filteredEvents.length === 0 && (
        <AnimatedSection>
          <section className="py-20">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6"
              >
                <Calendar className="w-12 h-12 text-purple-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {filterType === 'all' ? 'No Events Scheduled' :
                  filterType === 'upcoming' ? 'No Upcoming Events' :
                    'No Past Events'}
              </h3>
              <p className="text-gray-600 mb-8">
                {filterType === 'upcoming'
                  ? "We're planning exciting events for our community. Check back soon for updates!"
                  : filterType === 'past'
                    ? "Stay tuned as we host more events in the future."
                    : "We're preparing amazing events for our startup community."}
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Notified
                <Sparkles className="w-4 h-4 ml-2" />
              </motion.a>
            </motion.div>
          </section>
        </AnimatedSection>
      )}

      {/* Call to Action */}
      <AnimatedSection delay={0.2}>
        <section className="relative py-20 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Join Our Community</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Stay Updated on Our Events
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto"
            >
              Don't miss out on valuable networking opportunities and learning experiences.
              Get in touch with us to stay informed about upcoming events.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center">
                  Contact Us
                  <Users className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="/about"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-200"
              >
                Learn More About Us
                <Target className="w-5 h-5 ml-2" />
              </motion.a>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-32 h-32 border-2 border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white/10 rounded-full"
          />
        </section>
      </AnimatedSection>
    </div>
  )
}