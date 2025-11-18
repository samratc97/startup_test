# Quick Start Guide

## Get Started in 5 Minutes

### 1. Install Dependencies
```powershell
npm install
```

### 2. Configure Firebase (Optional for Development)

The app works with mock data by default. To enable Firebase:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Copy `.env.local.example` to `.env.local`
3. Add your Firebase credentials to `.env.local`

**Note:** Without Firebase configuration, the app will use mock data for development. This lets you see the UI and test functionality immediately.

### 3. Run Development Server
```powershell
npm run dev
```

### 4. Open in Browser

- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

### 5. Explore the Features

#### Public Pages (Work Immediately)
- **Homepage** (`/`) - Carousel, notices, featured content
- **Startups** (`/startups`) - Browse incubated startups
- **Events** (`/events`) - Upcoming and past events
- **Team** (`/team`) - Team member profiles
- **About** (`/about`) - Center information
- **Contact** (`/contact`) - Contact form and info

#### Admin Panel (Requires Firebase)
Access at `/admin/login` with Firebase authentication.

**Admin Features:**
- Dashboard with statistics
- Manage Startups (CRUD)
- Manage Events (CRUD)
- Manage Notices (CRUD)
- Manage Team Members (CRUD)
- Manage FAQs (CRUD)
- Manage Carousel Images (CRUD)
- Update Contact Information

## Without Firebase Configuration

The app uses mock data automatically. You can:
- ✅ View all public pages
- ✅ Test UI and navigation
- ✅ See sample data
- ❌ Cannot use admin panel
- ❌ Cannot persist data changes

## With Firebase Configuration

Follow the detailed setup in [FIREBASE-SETUP.md](./FIREBASE-SETUP.md) to:
- ✅ Enable admin authentication
- ✅ Create/edit/delete content
- ✅ Store data persistently
- ✅ Upload images to Firebase Storage
- ✅ Manage all content dynamically

## Project Structure

```
app/
├── page.tsx              # Homepage
├── about/                # About page
├── startups/             # Startups listing
├── startup/[slug]/       # Individual startup detail
├── events/               # Events listing
├── team/                 # Team page
├── contact/              # Contact page
└── admin/                # Admin panel
    ├── login/            # Authentication
    ├── startups/         # Manage startups
    ├── events/           # Manage events
    ├── notices/          # Manage notices
    ├── team/             # Manage team
    ├── faqs/             # Manage FAQs
    ├── carousel/         # Manage carousel
    └── contact/          # Manage contact info
```

## Key Technologies

- **Next.js 15.5.3** - React framework with App Router
- **React 19** - Latest React with server components
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first CSS
- **Firebase** - Backend (Firestore, Auth, Storage)
- **Lucide React** - Beautiful icons

## Common Commands

```powershell
# Development
npm run dev          # Start dev server (localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run linter
```

## Next Steps

1. **Customize Branding**: Update colors in `tailwind.config.ts`
2. **Add Content**: Use admin panel or mock data
3. **Configure Firebase**: For production deployment
4. **Deploy**: To Vercel, Netlify, or your platform

## Need Help?

- **Firebase Setup**: See [FIREBASE-SETUP.md](./FIREBASE-SETUP.md)
- **TypeScript Types**: Check `types/index.ts`
- **Components**: Browse `components/` directory
- **Server Actions**: Review `actions/index.ts`

## Development Tips

### Adding New Data Without Firebase
Edit `lib/mock-data.ts` to add sample:
- Startups
- Events
- Notices
- Team members
- FAQs
- Carousel images
- Contact information

### Testing Admin Panel
1. Complete Firebase setup
2. Create admin user in Firebase Console
3. Login at `/admin/login`
4. Manage all content through admin interface

### Customizing Styles
- **Colors**: `app/globals.css` and `tailwind.config.ts`
- **Components**: `components/` directory
- **Layout**: `app/layout.tsx`

## Production Checklist

Before deploying:
- [ ] Set up Firebase project
- [ ] Configure environment variables
- [ ] Update Firestore security rules
- [ ] Create admin user
- [ ] Test all admin CRUD operations
- [ ] Add production content
- [ ] Configure custom domain
- [ ] Enable Firebase security features

## Support

The application is fully functional with mock data for immediate testing and can be upgraded to Firebase for production use.

Start exploring the application now with `npm run dev`!