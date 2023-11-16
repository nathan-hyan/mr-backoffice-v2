import { Box, Typography } from '@mui/material';

import styles from './styles.module.scss';

interface Props {
  data: string[];
}

function ImageDisplay({ data }: Props) {
  return data ? (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {data.map((image) => (
        <img src={image} alt='Product' key={image} className={styles.image} />
      ))}
    </Box>
  ) : (
    <Typography
      variant='subtitle1'
      color='error'
      sx={{
        width: '100%',
        textAlign: 'center',
      }}
    >
      No hay imagenes subidas, por favor ingrese una imágen
    </Typography>
  );
}
export default ImageDisplay;
