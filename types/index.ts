export interface Startup {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website?: string;
  founded: number;
  category: string;
  team: string[];
  status: 'active' | 'graduated' | 'incubating';
  featured: boolean;
  images?: string[];
  fullDescription?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  image?: string;
  type: 'workshop' | 'seminar' | 'networking' | 'competition' | 'other';
  featured: boolean;
  registrationLink?: string;
  fullDescription?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  active: boolean;
}

export interface CarouselImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  department?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactInfo {
  id?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  officeHours?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}