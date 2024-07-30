import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Box, Button, Divider, Typography } from '@mui/material';
import type { Product } from 'types/data';
import { Nullable } from 'vite-env';

import calculateNumberWithPercentage from '~utils/addPercentage';

import ControlPanel from './components/ControlPanel';
import PriceTag from './components/PriceTag';
import { ControlPanelValues, FORM_CONFIG } from './constants';

function PriceTagGenerator() {
  const productList = useLoaderData() as Product[];
  const { state } = useNavigation();
  const { control, watch } = useForm<ControlPanelValues>(FORM_CONFIG);
  const printable = useRef<Nullable<HTMLDivElement>>(null);

  const handlePrint = useReactToPrint({
    content: () => printable.current,
  });

  const map =
    watch('generatorType') === 'all'
      ? productList
      : watch('individualProducts');

  return (
    <>
      <ControlPanel
        generatorType={watch('generatorType')}
        fetchLoading={state === 'loading'}
        productList={productList}
        control={control}
      />

      <Divider />

      {map.length > 0 ? (
        <>
          <Typography variant='h6'>Previsualización</Typography>
          <Button variant='contained' onClick={handlePrint}>
            Imprimir etiquetas
          </Button>
        </>
      ) : (
        <Typography variant='body1' color={'red'} textAlign={'center'}>
          Elija un producto para continuar
        </Typography>
      )}
      <Box
        ref={printable}
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 0.5,
        }}
      >
        {map.map(
          ({ name, id, barcode, internalId, prices: { cost, retail } }) => (
            <PriceTag
              id={id}
              key={id}
              barCode={barcode}
              cashPrice={
                !retail
                  ? 'Invalid'
                  : calculateNumberWithPercentage(
                      cost.value,
                      retail?.value || 0,
                      'incr'
                    )
              }
              internalId={internalId}
              name={name}
              showPrices={watch('showPrices')}
              variant={watch('variant')}
            />
          )
        )}
      </Box>
    </>
  );
}
export default PriceTagGenerator;
