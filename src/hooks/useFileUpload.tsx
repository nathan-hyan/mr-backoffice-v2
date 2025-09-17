/* eslint-disable no-await-in-loop */
import { ChangeEventHandler, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { getDownloadURL } from 'firebase/storage';
import { enqueueSnackbar } from 'notistack';
import { Product } from 'types/data';

import usePercentage from './usePercentage';
import useStorage from './useStorage';

function useFileUpload(
  watch: UseFormWatch<Product>,
  setValue: UseFormSetValue<Product>,
  fallbackName?: string
) {
  const { uploadImage } = useStorage();
  const { getPercentage, currentPercentage, clearCurrentTimeout } =
    usePercentage();
  const [isUploading, setIsUploading] = useState(false);

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

    const actuales = watch('imageURL') || [];

    const nuevas: string[] = [];

    for (let i = 0; i < files.length; i += 1) {
      const current = files.item(i);
      if (current) {
        try {
          const imageReference = await uploadImage(current, productName);
          const url = await getDownloadURL(imageReference.ref);
          nuevas.push(url);
          clearCurrentTimeout();
          getPercentage(files.length, i);
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error ? err.message : 'Error desconocido';
          enqueueSnackbar(`Ocurrió un error: ${errorMessage}`, {
            variant: 'error',
          });
        }
      }
    }

    const resultado = [...nuevas, ...actuales];
    setValue('imageURL', resultado);

    enqueueSnackbar('Imágenes subidas correctamente', {
      variant: 'success',
    });
    setIsUploading(false);
  };

  return {
    handleFileUpload,
    isUploading,
    uploadProgress: currentPercentage,
  };
}

export default useFileUpload;
