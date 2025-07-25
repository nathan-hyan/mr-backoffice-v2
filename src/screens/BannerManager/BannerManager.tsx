/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

import styles from './styles.module.scss';

import BannerImageSelection from './Components/BannerImageSelection';

function Banners() {
  const { watch, setValue, getValues, reset } = useForm<Record<string, any>>({
    defaultValues: {
      sliderImages: [],
      headerImage: [],
      midImage1: [],
      midImage2: [],
      bottomImage: [],
      sliderTag: '',
      headerTag: '',
      mid1Tag: '',
      mid2Tag: '',
      bottomTag: '',
      mid3Tag: '',
    },
  });

  const { setOrUpdateDocument } = useFirestore(FirestoreCollections.Banners);

  const handleSaveBanners = async () => {
    const {
      sliderImages,
      headerImage,
      midImage1,
      midImage2,
      bottomImage,
      sliderTag,
      headerTag,
      mid1Tag,
      mid2Tag,
      mid3Tag,
    } = getValues();

    const bannersToSave = [
      { id: 'slider', images: sliderImages, tag: sliderTag },
      { id: 'header', images: headerImage, tag: headerTag },
      { id: 'mid1', images: midImage1, tag: mid1Tag },
      { id: 'mid2', images: midImage2, tag: mid2Tag },
      { id: 'bottom', images: bottomImage, tag: mid3Tag },
    ];

    const filteredBanners = bannersToSave.filter(
      (banner) => Array.isArray(banner.images) && banner.images.length > 0
    );

    await Promise.all(
      filteredBanners.map((banner) =>
        setOrUpdateDocument(banner.id, {
          images: banner.images,
          tag: banner.tag?.trim() || null,
          updatedAt: new Date(),
          id: banner.id,
        })
      )
    );

    reset();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div className={styles.header}>
        <Typography variant='h4' fontWeight='bold'>
          Header
        </Typography>

        <div className={styles.headerImage}>
          <Box sx={{ width: '70%' }}>
            <Typography variant='h6' fontWeight='bold'>
              Slider(sin límite)
            </Typography>
            <TextField
              label='Hashtag promocional (opcional)'
              variant='outlined'
              size='small'
              value={watch('sliderTag')}
              onChange={(e) => setValue('sliderTag', e.target.value)}
              sx={{ mb: 2 }}
            />
            <Divider sx={{ mb: 2 }} />
            <BannerImageSelection
              data={watch('sliderImages')}
              setValue={setValue}
              watch={watch}
              fieldName='sliderImages'
              prefix='slider'
            />
          </Box>

          <Box sx={{ width: '30%' }}>
            <Typography variant='h6' fontWeight='bold'>
              Header (2 imagen)
            </Typography>
            <TextField
              label='Hashtag promocional (opcional)'
              variant='outlined'
              size='small'
              value={watch('headerTag')}
              onChange={(e) => setValue('headerTag', e.target.value)}
              sx={{ mb: 2 }}
            />
            <Divider sx={{ mb: 2 }} />
            <BannerImageSelection
              data={watch('headerImage')}
              setValue={setValue}
              watch={watch}
              fieldName='headerImage'
              prefix='header'
              maxImages={2}
            />
          </Box>
        </div>
      </div>

      <div className={styles.mid}>
        <Typography variant='h4' fontWeight='bold'>
          Mid section
        </Typography>
        <div className={styles.midImage}>
          <div className={styles.headerMid}>
            <Box sx={{ width: '50%' }}>
              <Typography variant='h6' fontWeight='bold'>
                Mid 1 (1 imagen)
              </Typography>
              <TextField
                label='Hashtag promocional (opcional)'
                variant='outlined'
                size='small'
                value={watch('mid1Tag')}
                onChange={(e) => setValue('mid1Tag', e.target.value)}
                sx={{ mb: 2 }}
              />
              <Divider sx={{ mb: 2 }} />
              <BannerImageSelection
                data={watch('midImage1')}
                setValue={setValue}
                watch={watch}
                fieldName='midImage1'
                prefix='mid1'
                maxImages={1}
              />
            </Box>

            <Box sx={{ width: '50%' }}>
              <Typography variant='h6' fontWeight='bold'>
                Mid 2 (2 imágenes)
              </Typography>
              <TextField
                label='Hashtag promocional (opcional)'
                variant='outlined'
                size='small'
                value={watch('mid2Tag')}
                onChange={(e) => setValue('mid2Tag', e.target.value)}
                sx={{ mb: 2 }}
              />
              <Divider sx={{ mb: 2 }} />
              <BannerImageSelection
                data={watch('midImage2')}
                setValue={setValue}
                watch={watch}
                fieldName='midImage2'
                prefix='mid2'
                maxImages={2}
              />
            </Box>
          </div>

          <div className={styles.headerMid3}>
            <Box sx={{ width: '100%' }}>
              <Typography variant='h6' fontWeight='bold'>
                Mid 3 (1 imagen)
              </Typography>
              <TextField
                label='Hashtag promocional (opcional)'
                variant='outlined'
                size='small'
                value={watch('mid3Tag')}
                onChange={(e) => setValue('mid3Tag', e.target.value)}
                sx={{ mb: 2 }}
              />
              <Divider sx={{ mb: 2 }} />
              <BannerImageSelection
                data={watch('bottomImage')}
                setValue={setValue}
                watch={watch}
                fieldName='bottomImage'
                prefix='bottom'
                maxImages={1}
              />
            </Box>
          </div>
        </div>
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          onClick={handleSaveBanners}
          variant='contained'
          sx={{
            backgroundColor: '#8251ED',
            color: '#fff',
            borderRadius: 2,
            paddingX: 3,
            height: 40,
            '&:hover': {
              backgroundColor: '#5e36b3',
            },
          }}
        >
          Guardar banners
        </Button>
      </Box>
    </Box>
  );
}

export default Banners;
