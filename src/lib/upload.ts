/**
 * Image processing and cover optimization for 9:16 vertical story covers.
 * Uses HTML5 Canvas client-side processing to crop to 9:16 and compress to lightweight WebP/JPEG.
 * Eliminates CORS issues and upload failures by embedding directly as an optimized Data URL.
 */

export async function processImageCover(
  file: File,
  targetWidth = 540,
  targetHeight = 960,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("El archivo seleccionado no es una imagen válida"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Fill background with black in case of alpha
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Aspect ratio cover calculation (centers and crops 9:16)
        const targetRatio = targetWidth / targetHeight; // 9/16 = 0.5625
        const imgRatio = img.width / img.height;

        let renderWidth = targetWidth;
        let renderHeight = targetHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > targetRatio) {
          // Image is wider than 9:16 -> fit height, crop width
          renderHeight = targetHeight;
          renderWidth = targetHeight * imgRatio;
          offsetX = (targetWidth - renderWidth) / 2;
        } else {
          // Image is taller or equal -> fit width, crop height
          renderWidth = targetWidth;
          renderHeight = targetWidth / imgRatio;
          offsetY = (targetHeight - renderHeight) / 2;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

        // Try WebP first for optimal compression, fallback to JPEG
        try {
          const webpData = canvas.toDataURL("image/webp", quality);
          if (webpData.startsWith("data:image/webp") && webpData.length > 500) {
            resolve(webpData);
            return;
          }
        } catch {
          // Fallback to jpeg
        }

        const jpegData = canvas.toDataURL("image/jpeg", quality);
        resolve(jpegData);
      };
      img.onerror = () => reject(new Error("No se pudo cargar la imagen seleccionada"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo desde el dispositivo"));
    reader.readAsDataURL(file);
  });
}

export async function uploadImageFile(file: File, _folder = "impact-covers"): Promise<string> {
  // Process directly into optimized 9:16 cover Data URL
  return processImageCover(file, 540, 960, 0.82);
}
