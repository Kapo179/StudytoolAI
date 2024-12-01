import { db, doc, getDoc, setDoc, updateDoc, increment } from './firebase';

const savesCollection = 'saves';

export async function getSaves(productId: string): Promise<number> {
  const docRef = doc(db, savesCollection, productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().count;
  } else {
    await setDoc(docRef, { count: 0 });
    return 0;
  }
}

export async function incrementSaves(productId: string): Promise<void> {
  const docRef = doc(db, savesCollection, productId);
  await updateDoc(docRef, { count: increment(1) });
}

export async function decrementSaves(productId: string): Promise<void> {
  const docRef = doc(db, savesCollection, productId);
  await updateDoc(docRef, { count: increment(-1) });
}