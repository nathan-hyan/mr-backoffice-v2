import { ChangeEventHandler, useState } from 'react';
import { getDownloadURL } from 'firebase/storage';
import { enqueueSnackbar } from 'notistack';

import usePercentage from './usePercentage';
import useStorage from './useStorage';

interface BannerItem {
  url: string;
  tag: string;
}

function useBannerUpload(prefix: string) {
  const { uploadImage } = useStorage();
  const { getPercentage, currentPercentage, clearCurrentTimeout } =
    usePercentage();

  const [isUploading, setIsUploading] = useState(false);
  const [imagesData, setImagesData] = useState<BannerItem[]>([]);

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
          getDownloadURL(imageReference.ref).then((url) => ({ url, tag: '' }))
        )
        .catch((err) => {
          enqueueSnackbar(`❌ Error al subir: ${err.message}`, {
            variant: 'error',
          });
          return null;
        });
    });

    const results = await Promise.all(uploadPromises);
    const validResults = results.filter((item): item is BannerItem => !!item);

    if (validResults.length > 0) {
      setImagesData(validResults);
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
    imagesData,
    setImagesData,
  };
}

export default useBannerUpload;
