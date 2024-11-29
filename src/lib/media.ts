import { toast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function validateImageFile(file: File): boolean {
  if (file.size > MAX_FILE_SIZE) {
    toast({
      title: 'File too large',
      description: `${file.name} is larger than 5MB`,
      variant: 'destructive',
    });
    return false;
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    toast({
      title: 'Invalid file type',
      description: `${file.name} is not a supported image format`,
      variant: 'destructive',
    });
    return false;
  }

  return true;
}

export function createImagePreview(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeImagePreview(preview: string) {
  URL.revokeObjectURL(preview);
}

export async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Max dimensions
      const MAX_WIDTH = 1920;
      const MAX_HEIGHT = 1080;
      
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        file.type,
        0.8 // Quality
      );
      
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(img.src);
    };
  });
}