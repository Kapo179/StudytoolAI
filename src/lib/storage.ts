import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const storage = getStorage();

export async function uploadImage(file: File, path: string): Promise<string> {
  const extension = file.name.split('.').pop();
  const filename = `${uuidv4()}.${extension}`;
  const storageRef = ref(storage, `${path}/${filename}`);
  
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadProductImages(
  logo: File,
  screenshots: File[]
): Promise<{ logoUrl: string; screenshotUrls: string[] }> {
  const logoUrl = await uploadImage(logo, 'logos');
  const screenshotUrls = await Promise.all(
    screenshots.map((file) => uploadImage(file, 'screenshots'))
  );

  return {
    logoUrl,
    screenshotUrls,
  };
}