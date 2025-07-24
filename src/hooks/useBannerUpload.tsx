import { ChangeEventHandler, useState } from 'react';
import { getDownloadURL } from 'firebase/storage';
import { enqueueSnackbar } from 'notistack';

import usePercentage from './usePercentage';
import useStorage from './useStorage';

function useBannerUpload(prefix: string) {
  const { uploadImage } = useStorage();
  const { getPercentage, currentPercentage, clearCurrentTimeout } =
    usePercentage();
  const [isUploading, setIsUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string[]>([]);

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const { files } = event.target;

    if (!prefix || !files || files.length === 0) {
      enqueueSnackbar('⚠️ No hay archivos o el prefijo no está definido.', {
        variant: 'error',
      });
      return;
    }

    setIsUploading(true);
    getPercentage(files.length, 0);

    const uploadPromises = Array.from(files).map((file, index) => {
      const namePrefix = `${prefix}-${Date.now()}-${index}`;

      return uploadImage(file, namePrefix)
        .then((imageReference) =>
          getDownloadURL(imageReference.ref).then((url) => url)
        )
        .catch((err) => {
          enqueueSnackbar(`❌ Error al subir: ${err.message}`, {
            variant: 'error',
          });
          return null;
        });
    });

    const urls = await Promise.all(uploadPromises);
    const validUrls = urls.filter((url): url is string => Boolean(url));

    if (validUrls.length > 0) {
      setImageURL(validUrls);
      enqueueSnackbar('✅ Imágenes subidas correctamente', {
        variant: 'success',
      });
    }

    clearCurrentTimeout();
    getPercentage(files.length, files.length);
    setIsUploading(false);
  };

  return {
    handleFileUpload,
    isUploading,
    uploadProgress: currentPercentage,
    imageURL,
    setImageURL,
  };
}

export default useBannerUpload;
