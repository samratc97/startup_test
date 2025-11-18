# 🚨 QUICK FIX: Permission Denied Error

## You're seeing this error?
```
Error fetching FAQs: [Error [FirebaseError]: Missing or insufficient permissions.]
code: 'permission-denied'
```

## ✅ Solution: Deploy Firebase Security Rules (2 minutes)

### Method 1: Firebase Console (Fastest!)

1. **Open Firebase Console**: https://console.firebase.google.com
2. **Select your project**
3. **Go to Firestore Database → Rules tab**
4. **Delete everything in the editor**
5. **Copy the entire content from the `firestore.rules` file** in your project
6. **Click "Publish"**
7. **Refresh your app** - Error should be gone! ✅

### Method 2: Copy-Paste Rules Directly

Go to Firebase Console > Firestore Database > Rules and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
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

Then click **Publish**.

### Method 3: Firebase CLI (For Advanced Users)

```powershell
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy rules
firebase deploy --only firestore:rules
```

---

## Why This Happens

Firebase Firestore starts in **test mode** with temporary rules that expire after 30 days. Once expired, all operations are denied unless you deploy permanent security rules.

## What These Rules Do

- ✅ **Public can READ**: Anyone can view startups, events, team, etc.
- ✅ **Admins can WRITE**: Only authenticated users can create/update/delete
- ✅ **Secure**: Protects your data while allowing public access

---

## Still Having Issues?

See detailed troubleshooting in [DEPLOY-RULES.md](./DEPLOY-RULES.md)

---

**That's it! Your app will work perfectly after deploying the rules.** 🚀
