// Local storage utilities for WorkForge - Kenya focused

const MAX_LOCAL_STORAGE_MB = 5;
const MAX_LOCAL_STORAGE_BYTES = MAX_LOCAL_STORAGE_MB * 1024 * 1024;

/**
 * Compress image to reduce localStorage usage
 * Stores in localStorage as base64 for instant loading
 */
export async function compressImage(
  file: File,
  maxWidth = 400,
  maxHeight = 400,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress as JPEG for smaller size
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Get available localStorage space
 */
export function getAvailableStorage(): number {
  let total = 0;
  try {
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
  } catch (e) {
    console.error('Error calculating storage:', e);
  }
  return MAX_LOCAL_STORAGE_BYTES - total;
}

/**
 * Check if there's enough space for image
 */
export function canStoreImage(base64Data: string): boolean {
  return base64Data.length < getAvailableStorage();
}

/**
 * Store profile photo in localStorage
 * Key: workforge_profile_photo_{userId}
 */
export function storeProfilePhoto(userId: number, base64Data: string): boolean {
  try {
    if (!canStoreImage(base64Data)) {
      console.warn('Not enough storage space for image');
      return false;
    }
    localStorage.setItem(`workforge_profile_photo_${userId}`, base64Data);
    return true;
  } catch (e) {
    console.error('Error storing profile photo:', e);
    return false;
  }
}

/**
 * Get profile photo from localStorage
 */
export function getProfilePhoto(userId: number): string | null {
  try {
    return localStorage.getItem(`workforge_profile_photo_${userId}`);
  } catch (e) {
    console.error('Error getting profile photo:', e);
    return null;
  }
}

/**
 * Delete profile photo from localStorage
 */
export function deleteProfilePhoto(userId: number): void {
  try {
    localStorage.removeItem(`workforge_profile_photo_${userId}`);
  } catch (e) {
    console.error('Error deleting profile photo:', e);
  }
}

/**
 * Store job photo/attachment in localStorage
 * Key: workforge_job_photo_{jobId}
 */
export function storeJobPhoto(jobId: number, base64Data: string): boolean {
  try {
    if (!canStoreImage(base64Data)) {
      return false;
    }
    localStorage.setItem(`workforge_job_photo_${jobId}`, base64Data);
    return true;
  } catch (e) {
    console.error('Error storing job photo:', e);
    return false;
  }
}

/**
 * Get job photo from localStorage
 */
export function getJobPhoto(jobId: number): string | null {
  try {
    return localStorage.getItem(`workforge_job_photo_${jobId}`);
  } catch (e) {
    return null;
  }
}