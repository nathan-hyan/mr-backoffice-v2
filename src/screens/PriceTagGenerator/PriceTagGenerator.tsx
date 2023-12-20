import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Product } from 'types/data';
import { Nullable } from 'vite-env';

import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';

import ControlPanel from './components/ControlPanel';
import PriceTag from './components/PriceTag';
import { ControlPanelValues, FORM_CONFIG } from './constants';

function PriceTagGenerator() {
  const { control, watch } = useForm<ControlPanelValues>(FORM_CONFIG);
  const { productList, saveProducts } = useProducts();
  const { fetchLoading, subscribeToData } = useFirestore<Product>(
    FirestoreCollections.Products
  );

  const printable = useRef<Nullable<HTMLDivElement>>(null);

  const handlePrint = useReactToPrint({
    content: () => printable.current,
  });

  useEffect(() => {
    if (productList && productList.length > 0) {
      return () => {};
    }

    const productsUnsubscribe = subscribeToData((data) => {
      saveProducts(data);
    });

    return () => {
      productsUnsubscribe();
    };
  }, [productList, saveProducts, subscribeToData]);

  const map =
    watch('generatorType') === 'all'
      ? productList
      : watch('individualProducts');

  return (
    <>
      <ControlPanel
        generatorType={watch('generatorType')}
        fetchLoading={fetchLoading}
        productList={productList}
        control={control}
      />

      <Divider />

      <Typography variant='h6'>Previsualización</Typography>
      <Button variant='contained' onClick={handlePrint}>
        Imprimir etiquetas
      </Button>
      <Box
        ref={printable}
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 0.5,
        }}
      >
        {map.map(({ name, barcode, internalId, prices: { cash } }) => (
          <PriceTag
            key={internalId}
            barCode={barcode}
            cashPrice={cash.value}
            internalId={internalId}
            name={name}
            showPrices={watch('showPrices')}
            variant={watch('variant')}
          />
        ))}
      </Box>
    </>
  );
}
export default PriceTagGenerator;
