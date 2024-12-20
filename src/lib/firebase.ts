// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, Timestamp, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
export const storage = getStorage(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export const uploadFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const storageRef = ref(storage, `uploads/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('User is not authenticated'));
      }
    });
  });
};

// Submissions Collection Reference
const submissionsRef = collection(db, 'product-submissions');

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

// Function to get subscription status
export const getSubscriptionStatus = async (uid: string): Promise<boolean> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.isSubscriber || false;
  }
  return false;
};