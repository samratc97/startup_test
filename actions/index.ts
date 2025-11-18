'use server'

import { 
  mockStartups, 
  mockEvents, 
  mockNotices, 
  mockCarouselImages, 
  mockTeamMembers, 
  mockFAQs, 
  mockContactInfo 
} from '../lib/mock-data'
import {
  getStartupsFromDB,
  getStartupBySlugFromDB,
  getEventsFromDB,
  getEventBySlugFromDB,
  getNoticesFromDB,
  getCarouselImagesFromDB,
  getTeamMembersFromDB,
  getFAQsFromDB,
  getContactInfoFromDB
} from '../lib/firebase-service'
import type { Startup, Event, Notice, CarouselImage, TeamMember, FAQ, ContactInfo } from '../types'

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return !!(
    process.env.FIREBASE_API_KEY &&
    process.env.FIREBASE_PROJECT_ID
  )
}

export async function getCarouselImages(): Promise<CarouselImage[]> {
  if (isFirebaseConfigured()) {
    try {
      const images = await getCarouselImagesFromDB()
      return images.length > 0 ? images : mockCarouselImages
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockCarouselImages
    }
  }
  return mockCarouselImages
}

export async function getNotices(): Promise<Notice[]> {
  if (isFirebaseConfigured()) {
    try {
      const notices = await getNoticesFromDB()
      const activeNotices = notices.filter(notice => notice.active)
      return activeNotices.length > 0 ? activeNotices : mockNotices.filter(n => n.active)
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockNotices.filter(notice => notice.active)
    }
  }
  return mockNotices.filter(notice => notice.active)
}

export async function getFeaturedStartups(): Promise<Startup[]> {
  if (isFirebaseConfigured()) {
    try {
      const startups = await getStartupsFromDB()
      const featured = startups.filter(startup => startup.featured)
      return featured.length > 0 ? featured : mockStartups.filter(s => s.featured)
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockStartups.filter(startup => startup.featured)
    }
  }
  return mockStartups.filter(startup => startup.featured)
}

export async function getAllStartups(): Promise<Startup[]> {
  if (isFirebaseConfigured()) {
    try {
      const startups = await getStartupsFromDB()
      return startups.length > 0 ? startups : mockStartups
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockStartups
    }
  }
  return mockStartups
}

export async function getStartupBySlug(slug: string): Promise<Startup | null> {
  if (isFirebaseConfigured()) {
    try {
      const startup = await getStartupBySlugFromDB(slug)
      return startup || mockStartups.find(s => s.slug === slug) || null
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockStartups.find(startup => startup.slug === slug) || null
    }
  }
  return mockStartups.find(startup => startup.slug === slug) || null
}

export async function getFeaturedEvents(): Promise<Event[]> {
  if (isFirebaseConfigured()) {
    try {
      const events = await getEventsFromDB()
      const featured = events.filter(event => event.featured)
      return featured.length > 0 ? featured : mockEvents.filter(e => e.featured)
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockEvents.filter(event => event.featured)
    }
  }
  return mockEvents.filter(event => event.featured)
}

export async function getAllEvents(): Promise<Event[]> {
  if (isFirebaseConfigured()) {
    try {
      const events = await getEventsFromDB()
      return events.length > 0 ? events : mockEvents.sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
  }
  return mockEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (isFirebaseConfigured()) {
    try {
      const event = await getEventBySlugFromDB(slug)
      return event || mockEvents.find(e => e.slug === slug) || null
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockEvents.find(event => event.slug === slug) || null
    }
  }
  return mockEvents.find(event => event.slug === slug) || null
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isFirebaseConfigured()) {
    try {
      const members = await getTeamMembersFromDB()
      return members.length > 0 ? members : mockTeamMembers
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockTeamMembers
    }
  }
  return mockTeamMembers
}

export async function getFAQs(): Promise<FAQ[]> {
  if (isFirebaseConfigured()) {
    try {
      const faqs = await getFAQsFromDB()
      return faqs.length > 0 ? faqs : mockFAQs
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockFAQs
    }
  }
  return mockFAQs
}

export async function getContactInfo(): Promise<ContactInfo> {
  if (isFirebaseConfigured()) {
    try {
      const contact = await getContactInfoFromDB()
      return contact || mockContactInfo
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      return mockContactInfo
    }
  }
  return mockContactInfo
}