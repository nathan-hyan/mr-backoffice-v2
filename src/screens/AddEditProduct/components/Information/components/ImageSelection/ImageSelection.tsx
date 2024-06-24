import { useEffect } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Box } from '@mui/material';
import { Product } from 'types/data';

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

  useEffect(() => {
    if (imageURL.length) {
      setValue('imageURL', imageURL);
    }
  }, [imageURL, setValue]);

  return (
    <Box sx={styles.container}>
      <ImageDisplay data={data} />
      <ImageUploader
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        handleFileUpload={handleFileUpload}
      />
    </Box>
  );
}
export default ImageSelection;
