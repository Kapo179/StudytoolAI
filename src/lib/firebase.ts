import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjV1rCKmGD6fEZeX1sJlNH2ViDV7l4_GE",
  authDomain: "aistudytools-xyz.firebaseapp.com",
  projectId: "aistudytools-xyz",
  storageBucket: "aistudytools-xyz.firebasestorage.app",
  messagingSenderId: "902710318519",
  appId: "1:902710318519:web:c3893e866e5835ae78c432",
  measurementId: "G-1P31MYKHZQ"
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