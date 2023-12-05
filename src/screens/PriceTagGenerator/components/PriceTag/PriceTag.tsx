import { Box, colors, Typography } from '@mui/material';

import capitalizePhrase from '~utils/capitalizePhrase';

import BarcodeGenerator from '../BarcodeGenerator/BarcodeGenerator';

interface Props {
  name: string;
  listPrice: number;
  cashPrice: number;
  internalId: number;
  barCode: string;
}

function PriceTag({ name, listPrice, cashPrice, internalId, barCode }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '55%',
          backgroundColor: colors.grey[100],
          color: colors.common.black,
          p: 3,
        }}
      >
        <Typography
          variant='h4'
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            'line-clamp': '2',
            '-webkit-box-orient': 'vertical',
            height: 'calc(2.5rem * 2)',
          }}
        >
          {capitalizePhrase(name)}
        </Typography>
        <Typography variant='caption'>ID: {internalId}</Typography>
        <br />
        <BarcodeGenerator value={barCode} />
      </Box>

      <Box
        sx={{
          width: '45%',
          backgroundColor: colors.amber[500],
          color: colors.common.black,
          p: 3,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant='body1'>Precio Contado:</Typography>
        <Typography variant='h2' fontWeight={700}>
          ${cashPrice.toFixed(2)}
        </Typography>
        <Typography>Precio de lista: ${listPrice.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
}
export default PriceTag;
