# ICFAI Startup & Incubation Center - Setup Guide

## Firebase Configuration

This application uses Firebase for database, authentication, and storage. Follow these steps to set up Firebase:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `icfai-startup-incubation`
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create database"
3. Start in **test mode** for development (change to production mode later)
4. Choose your preferred location (e.g., `asia-south1` for India)
5. Click "Enable"

### 3. Enable Authentication

1. Go to **Build > Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

### 4. Enable Storage

1. Go to **Build > Storage**
2. Click "Get started"
3. Start in **test mode** for development
4. Click "Done"

### 5. Create Admin User

1. Go to **Authentication > Users**
2. Click "Add user"
3. Enter email: `admin@icfai.ac.in`
4. Enter password: (your secure password)
5. Click "Add user"

### 6. Get Firebase Configuration

1. Go to **Project settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register app with nickname: `ICFAI Admin Panel`
5. Copy the configuration object

### 7. Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```powershell
   Copy-Item .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Firebase configuration:
   ```
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

### 8. Initialize Firestore Collections

Run the development server and the collections will be automatically created when you add data through the admin panel:

- `startups` - Startup companies
- `events` - Workshops, seminars, networking events
- `notices` - Important announcements
- `carousel` - Homepage carousel images
- `team` - Team member profiles
- `faqs` - Frequently asked questions
- `contact` - Contact information

## Installation & Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup Steps

1. **Clone the repository** (if applicable):
   ```powershell
   git clone <repository-url>
   cd startup-incubation
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Configure Firebase** (see above section)

4. **Run development server**:
   ```powershell
   npm run dev
   ```

5. **Open application**:
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin/login

### Admin Login

Use the credentials you created in Firebase Authentication:
- Email: `admin@icfai.ac.in`
- Password: (your password)

## Project Structure

```
startup-incubation/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── startups/          # Startups listing
│   ├── startup/[slug]/    # Individual startup pages
│   ├── events/            # Events listing
│   ├── team/              # Team page
│   ├── contact/           # Contact page
│   └── admin/             # Admin panel
│       ├── login/         # Admin authentication
│       ├── startups/      # Manage startups
│       ├── events/        # Manage events
│       ├── notices/       # Manage notices
│       ├── team/          # Manage team members
│       ├── faqs/          # Manage FAQs
│       ├── carousel/      # Manage carousel
│       └── contact/       # Manage contact info
├── components/            # Reusable React components
├── lib/                   # Utility functions
│   ├── firebase.ts        # Firebase initialization
│   ├── firebase-service.ts # CRUD operations
│   ├── utils.ts           # Helper functions
│   └── mock-data.ts       # Fallback mock data
├── types/                 # TypeScript type definitions
│   └── index.ts
└── actions/               # Server actions
    └── index.ts
```

## Features

### Public Features
- **Homepage**: Hero carousel, scrolling notices, featured startups & events, about section, FAQs
- **Startups**: Browse and view detailed startup profiles
- **Events**: Upcoming and past events with registration links
- **Team**: Team member profiles with contact information
- **About**: Comprehensive information about the incubation center
- **Contact**: Contact form and information

### Admin Features
- **Authentication**: Secure login with Firebase Auth
- **Dashboard**: Statistics and quick actions
- **CRUD Operations**: Full create, read, update, delete for all content
- **Real-time Updates**: Changes reflect immediately on public site
- **Responsive Design**: Works on desktop, tablet, and mobile

## Database Schema

### Startups Collection
```typescript
{
  id: string
  name: string
  slug: string
  description: string
  logo: string (URL)
  website?: string
  founded: number (year)
  category: string
  team: string[]
  status: 'active' | 'incubating' | 'graduated'
  featured: boolean
  fullDescription?: string
  images?: string[]
}
```

### Events Collection
```typescript
{
  id: string
  title: string
  slug: string
  description: string
  date: string (YYYY-MM-DD)
  time: string (HH:MM)
  location: string
  image: string (URL)
  type: 'workshop' | 'seminar' | 'networking' | 'competition'
  featured: boolean
  registrationLink?: string
}
```

### Notices Collection
```typescript
{
  id: string
  title: string
  content: string
  date: string (YYYY-MM-DD)
  priority: 'low' | 'medium' | 'high'
  active: boolean
}
```

### Carousel Collection
```typescript
{
  id: string
  url: string (image URL)
  alt: string
  title?: string
  subtitle?: string
  link?: string
}
```

### Team Collection
```typescript
{
  id: string
  name: string
  role: string
  image: string (URL)
  department: string
  email?: string
  linkedin?: string
  bio?: string
}
```

### FAQs Collection
```typescript
{
  id: string
  question: string
  answer: string
  category: string
}
```

### Contact Collection
```typescript
{
  id: string
  email: string
  phone: string
  address: string
  website?: string
  socialMedia?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Azure Static Web Apps

## Security Rules Setup (IMPORTANT!)

### Deploy Firestore Rules

The project includes security rules files. Deploy them to Firebase:

**Option 1: Using Firebase Console**

1. Go to **Firebase Console > Firestore Database > Rules**
2. Copy the contents from `firestore.rules` file in your project
3. Paste into the rules editor
4. Click **Publish**

**Option 2: Using Firebase CLI** (Recommended)

```powershell
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (one-time setup)
firebase init

# Select: Firestore, Storage
# Use existing project
# Accept default filenames (firestore.rules, storage.rules)

# Deploy rules
firebase deploy --only firestore:rules,storage:rules
```

### Firestore Rules (Already in `firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for all collections
    // Authenticated write access (admin only)
    
    match /startups/{startupId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    match /events/{eventId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    match /notices/{noticeId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    match /carousel/{carouselId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    match /team/{teamId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    match /faqs/{faqId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    match /contact/{contactId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### Storage Rules (Already in `storage.rules`)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /startups/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /events/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /team/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /carousel/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Quick Deploy via Console (Easiest Method)

**For Firestore:**
1. Open Firebase Console
2. Go to **Firestore Database > Rules**
3. Replace everything with the content from `firestore.rules`
4. Click **Publish**

**For Storage:**
1. Open Firebase Console
2. Go to **Storage > Rules**
3. Replace everything with the content from `storage.rules`
4. Click **Publish**

**⚠️ Important:** Without deploying these rules, you'll get "permission-denied" errors!

## Troubleshooting

### Firebase Not Configured
If you see mock data instead of Firebase data:
1. Verify `.env.local` file exists with correct values
2. Restart development server
3. Check browser console for Firebase errors

### Authentication Issues
1. Verify email/password authentication is enabled in Firebase Console
2. Check admin user exists in Firebase Authentication
3. Clear browser cookies and try again

### Build Errors
1. Delete `.next` folder: `Remove-Item -Recurse -Force .next`
2. Delete `node_modules`: `Remove-Item -Recurse -Force node_modules`
3. Reinstall: `npm install`
4. Rebuild: `npm run build`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter

## Tech Stack

- **Framework**: Next.js 15.5.3
- **React**: 19
- **TypeScript**: Latest
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Carousel**: React Fast Marquee

## Support

For issues or questions:
1. Check Firebase Console for errors
2. Review browser console logs
3. Verify environment variables
4. Check Firestore security rules

## License

MIT License - feel free to use this project for your institution.