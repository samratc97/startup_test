import {
  getCarouselImages,
  getNotices,
  getFeaturedStartups,
  getFeaturedEvents,
  getFAQs
} from '../actions'
import CarouselComponent from '../components/CarouselComponent'
import NoticeLine from '../components/NoticeLine'
import StartupSection from '../components/StartupSection'
import EventCardSection from '../components/EventCardSection'
import AboutCard from '../components/AboutCard'
import Accordion from '../components/Accordion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default async function Home() {
  // Fetch all data in parallel for better performance
  const [carouselImages, notices, featuredStartups, featuredEvents, faqs] = await Promise.all([
    getCarouselImages(),
    getNotices(),
    getFeaturedStartups(),
    getFeaturedEvents(),
    getFAQs()
  ])

  return (
    <>
      <Navbar />

      <div className="min-h-screen">
        {/* Notice Line */}
        <NoticeLine notices={notices} />

        {/* Hero Carousel */}
        <section className="relative">
          <CarouselComponent images={carouselImages} />
        </section>

        {/* About Section */}
        <AboutCard className='pt-8 bg-gray-100' />

        {/* Featured Startups */}
        <StartupSection startups={featuredStartups} />

        {/* Featured Events */}
        <EventCardSection events={featuredEvents} />

        {/* FAQ Section */}
        <Accordion faqs={faqs} />
      </div>
      <Footer />

    </>
  )
}