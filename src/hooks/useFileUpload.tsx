/* eslint-disable no-await-in-loop */
import { ChangeEventHandler, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { getDownloadURL } from 'firebase/storage';
import { enqueueSnackbar } from 'notistack';
import { Product } from 'types/data';

import usePercentage from './usePercentage';
import useStorage from './useStorage';

function useFileUpload(watch: UseFormWatch<Product>, fallbackName?: string) {
  const { uploadImage } = useStorage();
  const { getPercentage, currentPercentage, clearCurrentTimeout } =
    usePercentage();
  const [isUploading, setIsUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string[]>([]);

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const { files } = event.target;

    const productName = fallbackName ?? watch('name');

    if (!productName || productName.length === 0) {
      enqueueSnackbar('Por favor, defina un nombre para subir la imagen', {
        variant: 'error',
      });
      return;
    }

    if (!files) {
      enqueueSnackbar('Ocurrió un error leyendo los archivos seleccionados', {
        variant: 'error',
      });
      return;
    }

    setIsUploading(true);
    getPercentage(files.length, 0);

    for (let i = 0; i < files.length; i += 1) {
      const current = files.item(i);
      if (!current) return;

      await uploadImage(current, productName)
        .then((imageReference) => {
          getDownloadURL(imageReference.ref).then((url) =>
            setImageURL((prevState) => [url, ...prevState])
          );
          clearCurrentTimeout();

          if (i + 1 === files.length) {
            enqueueSnackbar('Imágenes subidas correctamente', {
              variant: 'success',
            });
            setIsUploading(false);
          }

          getPercentage(files.length, i);
        })
        .catch((err) => {
          enqueueSnackbar(`Ocurrió un error: ${err.message}`, {
            variant: 'error',
          });
        });
    }
  };

  return {
    handleFileUpload,
    isUploading,
    uploadProgress: currentPercentage,
    imageURL,
  };
}

export default useFileUpload;
