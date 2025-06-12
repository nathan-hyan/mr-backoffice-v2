import { useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Box } from '@mui/material';
import { Product } from 'types/data';

import defaultProduct from '~assets/defaultProduct.jpg';
import useFileUpload from '~hooks/useFileUpload';

import { ImageDisplay, ImageUploader } from './components';
import { styles } from './ImageSelection.styles';

interface Props {
  data: string[];
  setValue: UseFormSetValue<Product>;
  watch: UseFormWatch<Product>;
}

function ImageSelection({ data, setValue, watch }: Props) {
  const { handleFileUpload, isUploading, uploadProgress, imageURL } =
    useFileUpload(watch);

  const [images, setImages] = useState<string[]>(
    data.length > 0 ? data : [defaultProduct]
  );

  useEffect(() => {
    if (imageURL.length) {
      setImages(imageURL);
      setValue('imageURL', imageURL);
    }
  }, [imageURL, setValue]);

  useEffect(() => {
    if (data.length > 0) setImages(data);
  }, [data]);

  const handleReorder = (newOrder: string[]) => {
    setImages(newOrder);
    setValue('imageURL', newOrder);
  };

  return (
    <Box sx={styles.container}>
      <ImageDisplay data={images} onReorder={handleReorder} />
      <ImageUploader
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        handleFileUpload={handleFileUpload}
      />
    </Box>
  );
}

export default ImageSelection;
