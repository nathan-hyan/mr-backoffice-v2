import { Box, Divider, Paper, Rating, Typography } from '@mui/material';
import { Product } from 'types/data';

import { styles } from './userFeedback.styles';
import { getAverageRating } from './userFeedback.utils';

interface Props {
  data: Product;
}

function UserFeedback({ data }: Props) {
  const hasUserFeedback = data.userFeedback && data.userFeedback?.length > 0;
  const comentariosText =
    data.userFeedback && data.userFeedback?.length > 1
      ? 'comentarios'
      : 'comentario';

  return hasUserFeedback ? (
    <>
      <Box>
        <Typography component='legend'>Rating de los clientes</Typography>
        <Box sx={styles.ratingBox}>
          <Rating
            name='user-feedback'
            value={getAverageRating(data.userFeedback)}
            readOnly
            precision={0.25}
          />
          <Typography variant='caption' m={0} p={0}>
            ({getAverageRating(data.userFeedback)}, {data.userFeedback.length}{' '}
            {comentariosText})
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={styles.userFeedback}>
        {data.userFeedback.map(({ comment }) => (
          <Paper key={comment + new Date()} sx={{ p: 3 }} elevation={3}>
            <Typography>{comment}</Typography>
          </Paper>
        ))}
      </Box>
    </>
  ) : null;
}
export default UserFeedback;
