import { useForm } from 'react-hook-form';
import { Box, Button, Divider, Typography } from '@mui/material';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

import styles from './styles.module.scss';

import BannerImageSelection from './Components/BannerImageSelection';

function Banners() {
  const { watch, setValue, getValues } = useForm<Record<string, string[]>>({
    defaultValues: {
      spinnerImages: [],
      headerImage: [],
      midImage1: [],
      midImage2: [],
      bottomImage: [],
    },
  });

  const { addDocument } = useFirestore(FirestoreCollections.Banners);

  const handleSaveBanners = async () => {
    const { spinnerImages, headerImage, midImage1, midImage2, bottomImage } =
      getValues();

    const bannersToSave = [
      { section: 'spinner', images: spinnerImages },
      { section: 'header', images: headerImage },
      { section: 'mid1', images: midImage1 },
      { section: 'mid2', images: midImage2 },
      { section: 'bottom', images: bottomImage },
    ];

    await Promise.all(
      bannersToSave.map((banner) =>
        addDocument({
          section: banner.section,
          images: banner.images,
          updatedAt: new Date(),
        })
      )
    );
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
              Spinner (sin límite)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BannerImageSelection
              data={watch('spinnerImages')}
              setValue={setValue}
              watch={watch}
              fieldName='spinnerImages'
              prefix='spinner'
            />
          </Box>

          <Box sx={{ width: '30%' }}>
            <Typography variant='h6' fontWeight='bold'>
              Header (1 imagen)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BannerImageSelection
              data={watch('headerImage')}
              setValue={setValue}
              watch={watch}
              fieldName='headerImage'
              prefix='header'
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
              <Divider sx={{ mb: 2 }} />
              <BannerImageSelection
                data={watch('midImage1')}
                setValue={setValue}
                watch={watch}
                fieldName='midImage1'
                prefix='mid1'
              />
            </Box>

            <Box sx={{ width: '50%' }}>
              <Typography variant='h6' fontWeight='bold'>
                Mid 2 (2 imágenes)
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <BannerImageSelection
                data={watch('midImage2')}
                setValue={setValue}
                watch={watch}
                fieldName='midImage2'
                prefix='mid2'
              />
            </Box>
          </div>

          <div className={styles.headerMid3}>
            <Box sx={{ width: '100%' }}>
              <Typography variant='h6' fontWeight='bold'>
                Mid 3 (1 imagen)
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <BannerImageSelection
                data={watch('bottomImage')}
                setValue={setValue}
                watch={watch}
                fieldName='bottomImage'
                prefix='bottom'
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
