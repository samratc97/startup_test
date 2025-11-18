# ICFAI Startup & Incubation Center Platform

A comprehensive Next.js-based web platform for the Startup & Incubation Center at ICFAI University, Tripura. This platform serves as a digital hub to showcase startups, manage events, and provide information about the incubation center.

## 🚀 Features

### ✅ Implemented (MVP)

- **🏠 Homepage Dashboard**
  - Image carousel for showcasing university highlights
  - Scrolling notice line for announcements
  - About section with mission, vision, and embedded video placeholder
  - Featured startups and events sections
  - FAQ accordion

- **🚀 Startup Showcase**
  - Startup listing with grid/card layout
  - Individual startup profile pages with dynamic routing (`/startup/[slug]`)
  - Startup cards with key information display
  - Status badges and filtering

- **📅 Events Management**
  - Event listing with upcoming/past event separation
  - Individual event detail pages
  - Event registration links and metadata
  - Event type categorization

- **🧭 Navigation & Layout**
  - Responsive navbar with mobile hamburger menu
  - Complete page routing (About, Contact, Events, Startups, Team)
  - Professional footer with contact information
  - Top loading indicator for better UX

- **👥 Team & Information Pages**
  - Team page with member profiles
  - Comprehensive about page
  - Contact page with form and information
  - FAQ section with accordion interface

### 🛠️ Technical Implementation

- **Frontend**: Next.js 15.5.3 with React 19
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React icons
- **Animations**: Custom CSS transitions and hover effects
- **Loading**: NextJS TopLoader for navigation feedback
- **Image Optimization**: Next.js Image component with Unsplash placeholders
- **Font**: Inter font for clean typography

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page  
│   ├── events/            # Events listing
│   ├── startup/[slug]/    # Dynamic startup pages
│   ├── startups/          # Startups listing
│   ├── team/              # Team page
│   ├── layout.tsx         # Root layout with navbar/footer
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── AboutCard.tsx      # Mission/vision content
│   ├── Accordion.tsx      # FAQ accordion
│   ├── CarouselComponent.tsx # Hero image slider
│   ├── EventCard.tsx      # Event display cards
│   ├── EventCardSection.tsx # Event listing sections
│   ├── Footer.tsx         # Site footer
│   ├── Navbar.tsx         # Navigation header
│   ├── NoticeLine.tsx     # Scrolling announcements
│   ├── StartupCard.tsx    # Startup display cards
│   └── StartupSection.tsx # Startup listing sections
├── actions/               # Server actions for data fetching
├── lib/                   # Utility functions and mock data
├── types/                 # TypeScript type definitions
└── public/images/         # Static image assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd startup-incubation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production 
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## 📊 Current Data

The platform currently uses mock data for demonstration purposes:

- **1 Featured Startups**: EcoTech Solutions, HealthTrack AI, AgriSmart
- **2 Sample Events**: Pitch Competition, Workshop Series, Tech Talks  
- **3 Team Members**: Director, Coordinator, Student Lead
- **4 FAQ Items**: Program information and requirements
- **5 Notice Items**: Application deadlines and announcements

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray shades for text and backgrounds
- **Accent**: Green, Purple, Orange for categories and status

### Typography
- **Font Family**: Inter (clean, modern)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good line spacing

### Components
- Consistent border radius (rounded-lg: 8px)
- Hover effects and smooth transitions
- Responsive grid layouts
- Accessibility-focused design

## 🔧 Configuration

### Environment Setup
The project is configured for:
- **Development**: Hot reload with Turbopack
- **Production**: Optimized builds for Vercel deployment
- **Linting**: Biome for code quality
- **TypeScript**: Strict type checking

### Image Optimization
- Using Next.js Image component
- Placeholder images from Unsplash
- Responsive image loading
- Proper alt text for accessibility

## 📱 Responsive Design

The platform is fully responsive with:
- **Mobile-first approach** using Tailwind CSS
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Collapsible mobile menu
- **Layout**: Flexible grid systems that adapt to screen size
- **Images**: Responsive scaling and lazy loading

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure build settings
3. Deploy with automatic CI/CD pipeline

### Manual Deployment
1. Build the project: `npm run build`
2. Start production server: `npm run start`
3. Deploy the `.next` folder and `public` assets

## 🔮 Future Enhancements (Phase 2 & 3)

### Phase 2 - Interactive Features
- [ ] User authentication for startup founders
- [ ] Application submission system
- [ ] Event registration functionality  
- [ ] Search and filtering capabilities
- [ ] Newsletter subscription
- [ ] Blog/News section
- [ ] Contact form backend integration

### Phase 3 - Advanced Features  
- [ ] Admin dashboard for content management
- [ ] Analytics and reporting
- [ ] Multi-language support
- [ ] Advanced SEO optimization
- [ ] Performance monitoring
- [ ] Email notification system
- [ ] Integration with actual CMS (Notion, Strapi, etc.)
- [ ] Real-time chat support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

**ICFAI University Tripura - Startup & Incubation Center**
- Website: [Coming Soon]
- Email: incubation@icfai.ac.in
- Phone: +91-381-2539555

---

**Built with ❤️ for fostering innovation and entrepreneurship at ICFAI University Tripura**