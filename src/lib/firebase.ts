import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Submissions Collection Reference
const submissionsRef = collection(db, 'submissions');

// Add a new submission
export async function addSubmission(data: any) {
  return addDoc(submissionsRef, {
    ...data,
    status: 'pending',
    createdAt: Timestamp.now(),
    votes: 0,
    reports: 0,
  });
}

// Get all submissions
export async function getSubmissions() {
  const q = query(submissionsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Get submissions by status
export async function getSubmissionsByStatus(status: string) {
  const q = query(
    submissionsRef,
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}