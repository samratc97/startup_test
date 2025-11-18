import type { Startup, Event, Notice, CarouselImage, TeamMember, FAQ, ContactInfo } from '@/types'

export const mockCarouselImages: CarouselImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop',
    alt: 'ICFAI University Tripura Campus',
    title: 'Innovation Hub',
    subtitle: 'Fostering entrepreneurship and innovation at ICFAI University Tripura'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop',
    alt: 'Startup Incubation Center',
    title: 'Startup Incubation',
    subtitle: 'Supporting startups from idea to market success'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop',
    alt: 'Innovation Events',
    title: 'Innovation Events',
    subtitle: 'Regular workshops, seminars, and networking events'
  }
]

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'New Batch Applications Open - Apply by December 15th',
    content: 'Applications for our next incubation batch are now open. Submit your innovative ideas today!',
    date: '2024-11-01',
    priority: 'high',
    active: true
  },
  {
    id: '2',
    title: 'Workshop: "Building MVPs" - November 25th',
    content: 'Join us for an interactive workshop on building minimum viable products',
    date: '2024-11-15',
    priority: 'medium',
    active: true
  },
  {
    id: '3',
    title: 'Investor Connect Session - December 5th',
    content: 'Meet potential investors and pitch your startup ideas',
    date: '2024-11-20',
    priority: 'high',
    active: true
  }
]

export const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    slug: 'ecotech-solutions',
    description: 'Sustainable technology solutions for waste management and recycling',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop',
    website: 'https://ecotech.example.com',
    founded: 2023,
    category: 'CleanTech',
    team: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar'],
    status: 'incubating',
    featured: true,
    fullDescription: 'EcoTech Solutions is pioneering innovative approaches to waste management through IoT-enabled smart bins and AI-powered sorting systems. Our mission is to create sustainable cities through technology.',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop']
  },
  {
    id: '2',
    name: 'HealthTrack AI',
    slug: 'healthtrack-ai',
    description: 'AI-powered health monitoring and predictive analytics platform',
    logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    website: 'https://healthtrack.example.com',
    founded: 2022,
    category: 'HealthTech',
    team: ['Dr. Sarah Wilson', 'Tech Lead Mike Chen', 'Data Scientist Lisa Ray'],
    status: 'active',
    featured: true,
    fullDescription: 'HealthTrack AI leverages machine learning to provide personalized health insights and early disease detection through wearable device integration.',
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop']
  },
  {
    id: '3',
    name: 'AgriSmart',
    slug: 'agrismart',
    description: 'Smart farming solutions using IoT and precision agriculture',
    logo: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=200&fit=crop',
    founded: 2023,
    category: 'AgriTech',
    team: ['Farmer Connect Team'],
    status: 'incubating',
    featured: false,
    fullDescription: 'AgriSmart helps farmers optimize crop yields through precision agriculture, soil monitoring, and weather prediction systems.'
  }
]

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Startup Pitch Competition 2024',
    slug: 'startup-pitch-competition-2024',
    description: 'Annual pitch competition for emerging startups with cash prizes',
    date: '2024-12-15',
    time: '09:00',
    location: 'ICFAI University Auditorium',
    image: 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=600&h=400&fit=crop',
    type: 'competition',
    featured: true,
    registrationLink: 'https://register.example.com/pitch-competition',
    fullDescription: 'Join us for our annual startup pitch competition where emerging entrepreneurs present their innovative ideas to a panel of expert judges. Winners receive cash prizes and incubation opportunities.'
  },
  {
    id: '2',
    title: 'Entrepreneurship Workshop Series',
    slug: 'entrepreneurship-workshop-series',
    description: 'Monthly workshop series covering various aspects of entrepreneurship',
    date: '2024-11-25',
    time: '14:00',
    location: 'Innovation Lab, Building A',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    type: 'workshop',
    featured: true,
    fullDescription: 'A comprehensive workshop series designed to equip aspiring entrepreneurs with essential skills in business planning, market research, and product development.'
  },
  {
    id: '3',
    title: 'Tech Talk: AI in Business',
    slug: 'tech-talk-ai-in-business',
    description: 'Expert discussion on leveraging AI for business growth',
    date: '2024-12-01',
    time: '16:00',
    location: 'Conference Room 101',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    type: 'seminar',
    featured: false,
    fullDescription: 'Industry experts discuss the practical applications of artificial intelligence in modern business operations and startup growth strategies.'
  }
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    role: 'Director, Startup & Incubation Center',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    department: 'Management',
    email: 'director@icfai.ac.in',
    bio: 'Dr. Kumar has over 15 years of experience in entrepreneurship and innovation management.'
  },
  {
    id: '2',
    name: 'Prof. Meera Sharma',
    role: 'Program Coordinator',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    department: 'Business Administration',
    email: 'coordinator@icfai.ac.in',
    bio: 'Prof. Sharma specializes in startup mentoring and business development.'
  },
  {
    id: '3',
    name: 'Arjun Patel',
    role: 'Student Innovation Lead',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    department: 'Computer Science',
    email: 'innovation.lead@icfai.ac.in',
    bio: 'Final year student passionate about technology entrepreneurship and innovation.'
  }
]

export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Who can apply for the incubation program?',
    answer: 'Students, alumni, and faculty members of ICFAI University Tripura with innovative business ideas can apply for our incubation program.',
    category: 'General'
  },
  {
    id: '2',
    question: 'What support does the incubation center provide?',
    answer: 'We provide mentorship, workspace, funding assistance, legal support, and networking opportunities to help startups grow.',
    category: 'Support'
  },
  {
    id: '3',
    question: 'How long is the incubation period?',
    answer: 'The typical incubation period is 12-18 months, depending on the startup\'s progress and requirements.',
    category: 'Program'
  },
  {
    id: '4',
    question: 'Is there any equity requirement?',
    answer: 'We take a small equity stake (typically 5-10%) in exchange for our comprehensive support and resources.',
    category: 'Financial'
  }
]

export const mockContactInfo: ContactInfo = {
  address: 'ICFAI University Tripura, Kamalghat, Agartala, Tripura 799210',
  phone: '+91-381-2539555',
  email: 'incubation@icfai.ac.in',
  officeHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
  socialLinks: {
    facebook: 'https://facebook.com/icfaitripura',
    twitter: 'https://twitter.com/icfaitripura',
    linkedin: 'https://linkedin.com/school/icfai-university-tripura',
    instagram: 'https://instagram.com/icfaitripura'
  }
}