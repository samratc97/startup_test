import Link from 'next/link'
import { ArrowRight, Rocket } from 'lucide-react'
import StartupCard from './StartupCard'
import type { Startup } from '@/types'

interface StartupSectionProps {
  startups: Startup[]
  showAll?: boolean
  title?: string
}

export default function StartupSection({ 
  startups, 
  showAll = false, 
  title = "Featured Startups" 
}: StartupSectionProps) {
  const displayStartups = showAll ? startups : startups.slice(0, 3)

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover innovative startups incubated at ICFAI University Tripura, 
            transforming ideas into successful businesses.
          </p>
        </div>

        {/* Startups Grid */}
        {displayStartups.length > 0 ? (
          <>
            <div className={`grid gap-6  ${
              showAll 
              ? 'justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {displayStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>

            {/* View All Link */}
            {!showAll && startups.length > 3 && (
              <div className="text-center mt-10">
                <Link
                  href="/startups"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  View All Startups
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Rocket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No Startups Yet</h3>
            <p className="text-gray-400">
              We're currently building our startup ecosystem. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}