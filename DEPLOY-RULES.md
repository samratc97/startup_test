# 🔐 Firebase Security Rules - Quick Deploy Guide

## ⚠️ You're seeing "permission-denied" errors!

This means Firebase security rules haven't been deployed yet. Follow these steps:

---

## Option 1: Deploy via Firebase Console (Easiest - 2 minutes)

### Step 1: Deploy Firestore Rules

1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database** → **Rules** tab
4. **Delete everything** in the editor
5. **Copy and paste** the entire content from `firestore.rules` file in your project
6. Click **Publish**
7. ✅ Done! Firestore rules are now active

### Step 2: Deploy Storage Rules

1. In Firebase Console, go to **Storage** → **Rules** tab
2. **Delete everything** in the editor
3. **Copy and paste** the entire content from `storage.rules` file in your project
4. Click **Publish**
5. ✅ Done! Storage rules are now active

### Step 3: Test Your App

Refresh your application and the errors should be gone!

---

## Option 2: Deploy via Firebase CLI (Advanced)

### Setup (One-time)

```powershell
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project directory
firebase init
```

When prompted:
- ✅ Select: **Firestore** and **Storage**
- ✅ Use an existing project (select your project)
- ✅ Firestore rules file: `firestore.rules` (default)
- ✅ Firestore indexes file: `firestore.indexes.json` (default)
- ✅ Storage rules file: `storage.rules` (default)

### Deploy Rules

```powershell
# Deploy both Firestore and Storage rules
firebase deploy --only firestore:rules,storage:rules
```

✅ Rules deployed successfully!

---

## What These Rules Do

### Firestore Rules (Database)
- **Public Read Access**: Anyone can view data (startups, events, team, etc.)
- **Authenticated Write Access**: Only logged-in admins can create/update/delete

### Storage Rules (Files)
- **Public Read Access**: Anyone can view uploaded images
- **Authenticated Write Access**: Only logged-in admins can upload files

---

## Verify Rules Are Working

### Test Public Access (Should Work)
1. Open http://localhost:3000
2. Browse startups, events, team pages
3. ✅ No errors = Rules working correctly

### Test Admin Access (Requires Login)
1. Go to http://localhost:3000/admin/login
2. Login with your Firebase admin credentials
3. Try creating/editing content
4. ✅ Can save changes = Rules working correctly

---

## Quick Firestore Rules Summary

```javascript
// All collections follow this pattern:
match /collectionName/{docId} {
  allow read: if true;                    // Anyone can read
  allow write: if request.auth != null;   // Only authenticated users can write
}
```

**Collections protected:**
- ✅ startups
- ✅ events
- ✅ notices
- ✅ carousel
- ✅ team
- ✅ faqs
- ✅ contact

---

## Troubleshooting

### Still Getting Errors?

**Check 1: Rules Published?**
- Go to Firebase Console > Firestore > Rules
- Verify the rules match your `firestore.rules` file
- Check the "Last updated" timestamp

**Check 2: Project Correct?**
- Verify `.env.local` has correct `FIREBASE_PROJECT_ID`
- Make sure you're in the right Firebase project

**Check 3: Wait a Moment**
- Rules can take 10-30 seconds to propagate
- Refresh your browser
- Clear browser cache if needed

**Check 4: Firestore Enabled?**
- Go to Firebase Console > Firestore Database
- Make sure database is created and enabled

---

## Common Errors and Solutions

### Error: "Missing or insufficient permissions"
**Solution:** Deploy Firestore rules (see Option 1 above)

### Error: "Permission denied. Could not perform this operation"
**Solution:** 
1. Check if you're logged in as admin
2. Verify authentication is enabled in Firebase Console
3. Deploy Firestore rules

### Error: "Failed to get document because the client is offline"
**Solution:**
1. Check internet connection
2. Verify Firebase configuration in `.env.local`
3. Make sure Firestore is enabled

---

## Need Help?

1. **Verify Firebase Setup**: Check [FIREBASE-SETUP.md](./FIREBASE-SETUP.md)
2. **Check Environment Variables**: Make sure `.env.local` is configured
3. **Review Console Errors**: Open browser DevTools → Console tab
4. **Check Firebase Console**: Look for errors in Firebase Console

---

## Quick Command Reference

```powershell
# One-time setup
npm install -g firebase-tools
firebase login
firebase init

# Deploy rules anytime
firebase deploy --only firestore:rules,storage:rules

# Deploy everything
firebase deploy

# Check current rules
firebase firestore:rules:list
```

---

## Files in This Project

- **`firestore.rules`** - Firestore database security rules
- **`storage.rules`** - Firebase Storage security rules
- **`.env.local.example`** - Environment variables template
- **`lib/firebase.ts`** - Firebase initialization
- **`lib/firebase-service.ts`** - Database CRUD operations

---

## ✅ Success Checklist

- [ ] Firestore rules deployed
- [ ] Storage rules deployed
- [ ] No "permission-denied" errors on public pages
- [ ] Admin can login successfully
- [ ] Admin can create/edit/delete content
- [ ] Changes appear on public site immediately

---

**Once rules are deployed, your app will work perfectly!** 🚀

If you used **Option 1** (Console), you're done in 2 minutes!  
If you used **Option 2** (CLI), you have automated deployment for the future!
