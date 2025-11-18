'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Rocket, Calendar, Bell, Users, HelpCircle, Image as ImageIcon, TrendingUp } from 'lucide-react'
import { 
  getStartupsFromDB, 
  getEventsFromDB, 
  getNoticesFromDB,
  getTeamMembersFromDB,
  getFAQsFromDB,
  getCarouselImagesFromDB 
} from '@/lib/firebase-service'

interface Stats {
  startups: number
  events: number
  notices: number
  team: number
  faqs: number
  carousel: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    startups: 0,
    events: 0,
    notices: 0,
    team: 0,
    faqs: 0,
    carousel: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [startups, events, notices, team, faqs, carousel] = await Promise.all([
        getStartupsFromDB(),
        getEventsFromDB(),
        getNoticesFromDB(),
        getTeamMembersFromDB(),
        getFAQsFromDB(),
        getCarouselImagesFromDB()
      ])

      setStats({
        startups: startups.length,
        events: events.length,
        notices: notices.length,
        team: team.length,
        faqs: faqs.length,
        carousel: carousel.length
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { name: 'Startups', count: stats.startups, icon: Rocket, color: 'bg-blue-500', href: '/admin/startups' },
    { name: 'Events', count: stats.events, icon: Calendar, color: 'bg-green-500', href: '/admin/events' },
    { name: 'Notices', count: stats.notices, icon: Bell, color: 'bg-yellow-500', href: '/admin/notices' },
    { name: 'Team Members', count: stats.team, icon: Users, color: 'bg-purple-500', href: '/admin/team' },
    { name: 'FAQs', count: stats.faqs, icon: HelpCircle, color: 'bg-pink-500', href: '/admin/faqs' },
    { name: 'Carousel Images', count: stats.carousel, icon: ImageIcon, color: 'bg-indigo-500', href: '/admin/carousel' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your incubation center content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</p>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/startups"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Rocket className="h-5 w-5 text-blue-600 mr-3" />
            <span className="font-medium text-gray-900">Add New Startup</span>
          </Link>
          <Link
            href="/admin/events"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="h-5 w-5 text-green-600 mr-3" />
            <span className="font-medium text-gray-900">Create Event</span>
          </Link>
          <Link
            href="/admin/notices"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Bell className="h-5 w-5 text-yellow-600 mr-3" />
            <span className="font-medium text-gray-900">Post Notice</span>
          </Link>
          <Link
            href="/admin/team"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-5 w-5 text-purple-600 mr-3" />
            <span className="font-medium text-gray-900">Add Team Member</span>
          </Link>
          <Link
            href="/admin/faqs"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="h-5 w-5 text-pink-600 mr-3" />
            <span className="font-medium text-gray-900">Add FAQ</span>
          </Link>
          <Link
            href="/admin/carousel"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ImageIcon className="h-5 w-5 text-indigo-600 mr-3" />
            <span className="font-medium text-gray-900">Upload Image</span>
          </Link>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          📋 Getting Started
        </h3>
        <p className="text-blue-800 mb-4">
          Welcome to the admin panel! Use the navigation menu on the left to manage different sections of your website.
          All changes will be reflected immediately on the public website.
        </p>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Click on any stat card to view and manage that content type</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use quick actions to quickly add new content</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Changes are saved to Firebase database in real-time</span>
          </li>
        </ul>
      </div>
    </div>
  )
}