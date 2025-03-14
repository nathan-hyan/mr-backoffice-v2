import { Box } from '@mui/material';

import styles from './styles.module.scss';

interface Props {
  data: string[];
}

function ImageDisplay({ data }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {data.map((image) => (
        <img src={image} alt='Product' key={image} className={styles.image} />
      ))}
    </Box>
  );
}

export default ImageDisplay;
