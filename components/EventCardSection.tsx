import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import EventCard from './EventCard'
import type { Event } from '@/types'

interface EventCardSectionProps {
  events: Event[]
  showAll?: boolean
  title?: string
}

export default function EventCardSection({ 
  events, 
  showAll = false, 
  title = "Upcoming Events" 
}: EventCardSectionProps) {
  const displayEvents = showAll ? events : events.slice(0, 3)

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our workshops, seminars, and networking events to enhance your 
            entrepreneurial journey and connect with like-minded innovators.
          </p>
        </div>

        {/* Events Grid */}
        {displayEvents.length > 0 ? (
          <>
            <div className={`grid gap-6 ${
              showAll 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {displayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* View All Link */}
            {!showAll && events.length > 3 && (
              <div className="text-center mt-10">
                <Link
                  href="/events"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  View All Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No Events Scheduled</h3>
            <p className="text-gray-400">
              We're planning exciting events. Stay tuned for updates!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}