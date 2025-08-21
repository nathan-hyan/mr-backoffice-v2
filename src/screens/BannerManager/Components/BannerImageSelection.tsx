/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { BannerFormValues } from 'types/data';

import defaultBanner from '~assets/defaultProduct.jpg';
import { useTags } from '~contexts/Tags';
import useBannerUpload from '~hooks/useBannerUpload';
import { styles } from '~screens/AddEditProduct/components/Information/components/ImageSelection/ImageSelection.styles';

import BannerImageDisplay from './BannerDisplay/BannerDisplay';
import BannerImageUploader from './BannerUpload/BannerUpload';

interface BannerItem {
  url: string;
  tag: string;
}

type BannerFieldKey = keyof BannerFormValues;

interface Props {
  data: BannerItem[];
  setValue: UseFormSetValue<BannerFormValues>;
  fieldName: BannerFieldKey;
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
    imagesData,
    setImagesData,
  } = useBannerUpload(prefix);
  const { enqueueSnackbar } = useSnackbar();

  const [images, setImages] = useState<BannerItem[]>(
    data.length > 0 ? data : [{ url: defaultBanner, tag: '' }]
  );
  const { tags, fetchTags } = useTags();

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (imagesData.length) {
      if (maxImages > 0 && imagesData.length > maxImages) {
        enqueueSnackbar(
          `Máximo ${maxImages} imágenes permitido para la sección "${prefix}"`,
          { variant: 'warning' }
        );
        setImagesData(data);
        return;
      }

      setImages(imagesData);
      setValue(fieldName, imagesData);
    }
  }, [
    imagesData,
    maxImages,
    data,
    setValue,
    fieldName,
    prefix,
    enqueueSnackbar,
    setImagesData,
  ]);

  useEffect(() => {
    if (data.length > 0) setImages(data);
  }, [data]);

  const handleReorder = (newOrder: BannerItem[]) => {
    setImages(newOrder);
    setImagesData(newOrder);
    setValue(fieldName, newOrder);
  };

  const handleTagChange = (index: number, newTag: string) => {
    const updated = [...images];
    updated[index].tag = newTag;
    setImages(updated);
    setImagesData(updated);
    setValue(fieldName, updated);
  };

  return (
    <Box sx={styles.container}>
      <BannerImageDisplay data={images} onReorder={handleReorder} />

      {images.map((img, idx) => (
        <Autocomplete
          key={`tag-${img.url}`}
          freeSolo
          options={tags.map((tag) => ({ label: tag, value: tag }))}
          value={img.tag}
          onInputChange={(_, newTag) => {
            handleTagChange(idx, newTag);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Tag imagen ${idx + 1}`}
              variant='outlined'
              size='small'
              sx={{ my: 1 }}
              fullWidth
              InputProps={{
                ...params.InputProps,
                sx: {
                  borderRadius: 1,
                  '& input': {
                    color: '#000',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#000',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#000',
                },
              }}
            />
          )}
        />
      ))}

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
