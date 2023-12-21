import { Box, Typography } from '@mui/material';

import capitalizePhrase from '~utils/capitalizePhrase';

import BarcodeGenerator from './BarcodeGenerator';
import * as styles from './PriceTag.styles';

interface Props {
  name: string;
  cashPrice: number;
  internalId: number;
  barCode: string;
  showPrices?: boolean;
  variant?: 'yellow' | 'green' | 'pink';
}

function PriceTag({
  name,
  cashPrice,
  internalId,
  barCode,
  showPrices,
  variant,
}: Props) {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.infoSide}>
        <Typography variant='caption' sx={styles.productName}>
          {capitalizePhrase(name)}
        </Typography>
        <Typography variant='caption'>ID: {internalId}</Typography>
        <br />
        {barCode ? <BarcodeGenerator value={barCode} /> : null}
      </Box>

      <Box sx={styles.priceSide(variant)}>
        {showPrices ? (
          <>
            <Typography variant='caption'>Precio contado:</Typography>
            <Typography variant='h5' fontWeight={700}>
              ${Number(cashPrice).toFixed(2)}
            </Typography>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

PriceTag.defaultProps = {
  showPrices: true,
  variant: 'yellow',
};

export default PriceTag;
