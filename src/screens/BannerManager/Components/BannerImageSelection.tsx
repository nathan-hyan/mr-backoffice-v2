import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';

import defaultBanner from '~assets/defaultProduct.jpg';
import useBannerUpload from '~hooks/useBannerUpload';
import { styles } from '~screens/AddEditProduct/components/Information/components/ImageSelection/ImageSelection.styles';

import BannerImageDisplay from './BannerDisplay/BannerDisplay';
import BannerImageUploader from './BannerUpload/BannerUpload';

interface Props {
  data: string[];
  setValue: UseFormSetValue<Record<string, string[]>>;
  fieldName: string;
  prefix: string;
  maxImages?: number;
}

function BannerImageSelection({
  data,
  setValue,
  fieldName,
  prefix,
  maxImages = 0,
}: Props) {
  const {
    handleFileUpload,
    isUploading,
    uploadProgress,
    imageURL,
    setImageURL,
  } = useBannerUpload(prefix);
  const { enqueueSnackbar } = useSnackbar();

  const [images, setImages] = useState<string[]>(
    data.length > 0 ? data : [defaultBanner]
  );

  useEffect(() => {
    if (imageURL.length) {
      if (maxImages > 0 && imageURL.length > maxImages) {
        enqueueSnackbar(
          `Máximo ${maxImages} imágenes permitido para la sección "${prefix}"`,
          { variant: 'warning' }
        );
        setImageURL(data); // revertimos la subida para mantener estado original
        return;
      }

      setImages(imageURL);
      setValue(fieldName, imageURL);
    }
  }, [
    imageURL,
    maxImages,
    data,
    setValue,
    fieldName,
    prefix,
    enqueueSnackbar,
    setImageURL,
  ]);

  useEffect(() => {
    if (data.length > 0) setImages(data);
  }, [data]);

  const handleReorder = (newOrder: string[]) => {
    setImages(newOrder);
    setImageURL(newOrder);
    setValue(fieldName, newOrder);
  };

  return (
    <Box sx={styles.container}>
      <BannerImageDisplay data={images} onReorder={handleReorder} />
      <BannerImageUploader
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        handleFileUpload={handleFileUpload}
        inputId={`upload-${prefix}`}
        label={`Subir imágenes - ${prefix}`}
      />
    </Box>
  );
}

export default BannerImageSelection;
