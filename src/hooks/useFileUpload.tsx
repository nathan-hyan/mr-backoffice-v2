/* eslint-disable no-await-in-loop */
import { ChangeEventHandler, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { getDownloadURL } from 'firebase/storage';
import { enqueueSnackbar } from 'notistack';
import { Product } from 'types/data';

import usePercentage from './usePercentage';
import useStorage from './useStorage';

function useFileUpload(watch: UseFormWatch<Product>) {
    const { uploadImage } = useStorage();
    const { getPercentage, currentPercentage, clearCurrentTimeout } =
        usePercentage();
    const [isUploading, setIsUploading] = useState(false);
    const [imageURL, setImageURL] = useState<string[]>([]);

    const handleFileUpload: ChangeEventHandler<HTMLInputElement> = async (
        event
    ) => {
        const { files } = event.target;

        if (watch('name').length === 0) {
            enqueueSnackbar(
                'Por favor, ingrese un nombre al producto antes de cargar una imagen',
                { variant: 'error' }
            );
            return;
        }

        if (!files) {
            enqueueSnackbar(
                'Ocurrio un error leyendo los archivos seleccionados',
                { variant: 'error' }
            );
            return;
        }

        setIsUploading(true);
        getPercentage(files.length, 0);

        for (let i = 0; i < files.length; i += 1) {
            const current = files.item(i);
            if (!current) {
                return;
            }

            await uploadImage(current, watch('name'))
                .then((imageReference) => {
                    getDownloadURL(imageReference.ref).then((url) =>
                        setImageURL((prevState) => [url, ...prevState])
                    );
                    clearCurrentTimeout();
                    if (i + 1 === files.length) {
                        enqueueSnackbar('Imagenes subidas correctamente', {
                            variant: 'success',
                        });

                        setIsUploading(false);
                    }

                    getPercentage(files.length, i);
                })
                .catch((err) => {
                    enqueueSnackbar(`Ocurrio un error: ${err.message}`, {
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
