import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function compressImage(
  file: File,
  maxWidth = 720,
  maxHeight = 1280,
  quality = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else resolve(file);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function uploadImageFile(file: File, folder = "portadas"): Promise<string> {
  try {
    const compressed = await compressImage(file, 720, 1280, 0.85);
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const storageRef = ref(storage, `${folder}/${Date.now()}_${cleanName}`);
    const snapshot = await uploadBytes(storageRef, compressed, {
      contentType: "image/jpeg",
    });
    return await getDownloadURL(snapshot.ref);
  } catch (err) {
    console.warn("Storage upload failed, using high-quality compressed data URL:", err);
    const compactBlob = await compressImage(file, 540, 960, 0.82);
    return await fileToDataUrl(compactBlob);
  }
}
