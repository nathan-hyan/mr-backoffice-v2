import { useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Box } from '@mui/material';
import { Product } from 'types/data';

import defaultProduct from '~assets/defaultProduct.jpg';
import useFileUpload from '~hooks/useFileUpload';

import styles from './styles.module.scss';

import { ImageDisplay, ImageUploader } from './components';

interface Props {
  data: string[];
  setValue: UseFormSetValue<Product>;
  watch: UseFormWatch<Product>;
}

function ImageSelection({ data, setValue, watch }: Props) {
  const { handleFileUpload, isUploading, uploadProgress } = useFileUpload(
    watch,
    setValue
  );

  const [images, setImages] = useState<string[]>(
    data.length > 0 ? data : [defaultProduct]
  );

  useEffect(() => {
    const current = watch('imageURL');
    if (current && current.length > 0) {
      setImages(current);
    }
  }, [watch]);

  useEffect(() => {
    if (data.length > 0) {
      setImages(data);
    }
  }, [data]);

  const handleReorder = (newOrder: string[]) => {
    setImages(newOrder);
    setValue('imageURL', newOrder);
  };

  const handleDeleteImage = (id: string) => {
    const nuevaLista = images.filter((img) => img !== id);
    setImages(nuevaLista);
    setValue('imageURL', nuevaLista);
  };

  return (
    <Box className={styles.container}>
      <ImageDisplay
        data={images}
        onReorder={handleReorder}
        onDelete={handleDeleteImage}
      />
      <ImageUploader
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        handleFileUpload={handleFileUpload}
      />
    </Box>
  );
}

export default ImageSelection;
