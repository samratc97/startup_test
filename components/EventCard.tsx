'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ExternalLink, ArrowRight, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Event } from '@/types'
import { formatDate, formatTime, truncateText } from '@/lib/utils'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date)
  const isUpcoming = eventDate > new Date()

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500 z-10 pointer-events-none" />

        {/* Image Section */}
        {event.image && (
          <div className="relative h-56 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full relative"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Featured Badge */}
            {event.featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute top-4 right-4 z-20"
              >
                <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </div>
              </motion.div>
            )}

            {/* Status Badge */}
            <div className="absolute top-4 left-4 z-20">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border shadow-lg ${isUpcoming
                    ? 'bg-green-500/90 text-white border-green-400'
                    : 'bg-gray-500/90 text-white border-gray-400'
                  }`}
              >
                {isUpcoming ? 'Upcoming' : 'Past Event'}
              </motion.div>
            </div>

            {/* Type Badge - Bottom of Image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <span className={`inline-block px-3 py-1 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium text-white ${event.type === 'workshop' ? 'bg-orange-500/20' :
                  event.type === 'seminar' ? 'bg-purple-500/20' :
                    event.type === 'networking' ? 'bg-green-500/20' :
                      event.type === 'competition' ? 'bg-red-500/20' :
                        'bg-gray-500/20'
                }`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 relative z-20 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <motion.h3
              className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1 line-clamp-2"
              whileHover={{ x: 5 }}
            >
              {event.title}
            </motion.h3>
            {event.registrationLink && isUpcoming && (
              <motion.div
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-md transition-all ml-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
            {truncateText(event.description, 100)}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-5 pt-4 border-t border-gray-100">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center text-l text-gray-600"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center mr-2.5">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium">{formatDate(event.date)}</span>
            </motion.div>

            {event.time && (
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-l text-gray-600"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center mr-2.5">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium">{formatTime(event.time)}</span>
              </motion.div>
            )}

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center text-l text-gray-600"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center mr-2.5 flex-shrink-0">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-bold line-clamp-2">{event.location}</span>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              href={`/events/${event.slug}`}
              className="flex-1"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold py-3 px-4 rounded-xl text-center transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  View Details
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </Link>

            {event.registrationLink && isUpcoming && (
              <Link
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold py-3 px-4 rounded-xl text-center transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    Register
                    <Users className="w-4 h-4" />
                  </span>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              </Link>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl" />
        </div>
      </div>
    </motion.div>
  )
}