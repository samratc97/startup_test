import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  Timestamp,
  DocumentData
} from 'firebase/firestore'
import { db } from './firebase'
import type { Startup, Event, Notice, CarouselImage, TeamMember, FAQ, ContactInfo } from '@/types'

// Collection names
const COLLECTIONS = {
  STARTUPS: 'startups',
  EVENTS: 'events',
  NOTICES: 'notices',
  CAROUSEL: 'carousel',
  TEAM: 'team',
  FAQS: 'faqs',
  CONTACT: 'contact'
}

// Helper to convert Firestore Timestamps
const convertTimestamp = (data: DocumentData) => {
  const converted = { ...data }
  Object.keys(converted).forEach(key => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate().toISOString().split('T')[0]
    }
  })
  return converted
}

// ===================================================================================
// STARTUPS
// ===================================================================================
export async function getStartupsFromDB(): Promise<Startup[]> {
  if (!db) return [];

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.STARTUPS))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    } as Startup))
  } catch (error) {
    console.error('Error fetching startups:', error)
    return []
  }
}

export async function getStartupBySlugFromDB(slug: string): Promise<Startup | null> {
  if (!db) return null;

  try {
    const q = query(collection(db, COLLECTIONS.STARTUPS), where('slug', '==', slug))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return null
    const _doc = querySnapshot.docs[0]
    return { id: _doc.id, ...convertTimestamp(_doc.data()) } as Startup
  } catch (error) {
    console.error('Error fetching startup:', error)
    return null
  }
}

export async function addStartupToDB(startup: Omit<Startup, 'id'>): Promise<string> {
  if (!db) return "";
  const docRef = await addDoc(collection(db, COLLECTIONS.STARTUPS), startup)
  return docRef.id
}

export async function updateStartupInDB(id: string, startup: Partial<Startup>): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, COLLECTIONS.STARTUPS, id), startup)
}

export async function deleteStartupFromDB(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, COLLECTIONS.STARTUPS, id))
}

// ===================================================================================
// EVENTS
// ===================================================================================
export async function getEventsFromDB(): Promise<Event[]> {
  if (!db) return [];

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.EVENTS))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    } as Event))
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getEventBySlugFromDB(slug: string): Promise<Event | null> {
  if (!db) return null;

  try {
    const q = query(collection(db, COLLECTIONS.EVENTS), where('slug', '==', slug))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return null
    const _doc = querySnapshot.docs[0]
    return { id: _doc.id, ...convertTimestamp(_doc.data()) } as Event
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export async function addEventToDB(event: Omit<Event, 'id'>): Promise<string> {
  if (!db) return "";
  const docRef = await addDoc(collection(db, COLLECTIONS.EVENTS), event)
  return docRef.id
}

export async function updateEventInDB(id: string, event: Partial<Event>): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, COLLECTIONS.EVENTS, id), event)
}

export async function deleteEventFromDB(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, COLLECTIONS.EVENTS, id))
}

// ===================================================================================
// NOTICES
// ===================================================================================
export async function getNoticesFromDB(): Promise<Notice[]> {
  if (!db) return [];

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.NOTICES))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    } as Notice))
  } catch (error) {
    console.error('Error fetching notices:', error)
    return []
  }
}

export async function addNoticeToDB(notice: Omit<Notice, 'id'>): Promise<string> {
  if (!db) return "";
  const docRef = await addDoc(collection(db, COLLECTIONS.NOTICES), notice)
  return docRef.id
}

export async function updateNoticeInDB(id: string, notice: Partial<Notice>): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, COLLECTIONS.NOTICES, id), notice)
}

export async function deleteNoticeFromDB(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, COLLECTIONS.NOTICES, id))
}

// ===================================================================================
// CAROUSEL
// ===================================================================================
export async function getCarouselImagesFromDB(): Promise<CarouselImage[]> {
  if (!db) return [];

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CAROUSEL))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CarouselImage))
  } catch (error) {
    console.error('Error fetching carousel images:', error)
    return []
  }
}

export async function addCarouselImageToDB(image: Omit<CarouselImage, 'id'>): Promise<string> {
  if (!db) return "";
  const docRef = await addDoc(collection(db, COLLECTIONS.CAROUSEL), image)
  return docRef.id
}

export async function updateCarouselImageInDB(id: string, image: Partial<CarouselImage>): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, COLLECTIONS.CAROUSEL, id), image)
}

export async function deleteCarouselImageFromDB(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, COLLECTIONS.CAROUSEL, id))
}

// ===================================================================================
// TEAM
// ===================================================================================
export async function getTeamMembersFromDB(): Promise<TeamMember[]> {
  if (!db) return [];

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.TEAM))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TeamMember))
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function addTeamMemberToDB(member: Omit<TeamMember, 'id'>): Promise<string> {
  if (!db) return "";
  const docRef = await addDoc(collection(db, COLLECTIONS.TEAM), member)
  return docRef.id
}

export async function updateTeamMemberInDB(id: string, member: Partial<TeamMember>): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, COLLECTIONS.TEAM, id), member)
}

export async function deleteTeamMemberFromDB(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, COLLECTIONS.TEAM, id))
}

// ===================================================================================
// FAQS
// ===================================================================================
export async function getFAQsFromDB(): Promise<FAQ[]> {
  if (!db) return [];

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.FAQS))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FAQ))
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

export async function addFAQToDB(faq: Omit<FAQ, 'id'>): Promise<string> {
  if (!db) return "";
  const docRef = await addDoc(collection(db, COLLECTIONS.FAQS), faq)
  return docRef.id
}

export async function updateFAQInDB(id: string, faq: Partial<FAQ>): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, COLLECTIONS.FAQS, id), faq)
}

export async function deleteFAQFromDB(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, COLLECTIONS.FAQS, id))
}

// ===================================================================================
// CONTACT
// ===================================================================================
export async function getContactInfoFromDB(): Promise<ContactInfo | null> {
  if (!db) return null;

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CONTACT))
    if (querySnapshot.empty) return null
    const _doc = querySnapshot.docs[0]
    return { ..._doc.data() } as ContactInfo
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
}

export async function updateContactInfoInDB(contact: Partial<ContactInfo>): Promise<void> {
  if (!db) return;

  const querySnapshot = await getDocs(collection(db, COLLECTIONS.CONTACT))
  if (querySnapshot.empty) {
    await addDoc(collection(db, COLLECTIONS.CONTACT), contact)
  } else {
    const docId = querySnapshot.docs[0].id
    await updateDoc(doc(db, COLLECTIONS.CONTACT, docId), contact)
  }
}