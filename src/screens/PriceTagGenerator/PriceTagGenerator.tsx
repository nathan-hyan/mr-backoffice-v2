import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Product } from 'types/data';

import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';

import PriceTag from './components/PriceTag/PriceTag';

function PriceTagGenerator() {
  const { fetchLoading, subscribeToData } = useFirestore<Product>(
    FirestoreCollections.Products
  );
  const { productList, saveProducts } = useProducts();
  const [generatorType, setGeneratorType] = useState<'all' | 'individual'>(
    'all'
  );
  const [individualProducts, setIndividualProducts] = useState<Product[]>([]);

  const handleTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: 'all' | 'individual'
  ) => {
    setGeneratorType(newAlignment);
    setIndividualProducts([]);
  };

  const handleProductChange = (
    _event: React.SyntheticEvent<Element>,
    selectedProducts: Product[]
  ) => {
    setIndividualProducts(selectedProducts);
  };

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

  return (
    <>
      <ToggleButtonGroup
        color='primary'
        value={generatorType}
        exclusive
        onChange={handleTypeChange}
      >
        <ToggleButton value='all'>Todos los productos</ToggleButton>
        <ToggleButton value='individual'>Productos individuales</ToggleButton>
      </ToggleButtonGroup>

      {generatorType === 'individual' ? (
        <>
          <Divider />
          <Autocomplete
            multiple
            onChange={handleProductChange}
            id='tags-standard'
            value={individualProducts}
            options={productList}
            getOptionLabel={(product) => product.name}
            loading={fetchLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='standard'
                label='Productos para incluir'
              />
            )}
          />
        </>
      ) : null}

      <Divider />

      <Typography variant='h6'>Previsualización:</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 3,
        }}
      >
        {generatorType === 'all'
          ? productList.map(
              ({ name, barcode, internalId, prices: { cash, list } }) => (
                <PriceTag
                  key={internalId}
                  barCode={barcode}
                  cashPrice={cash.value}
                  internalId={internalId}
                  listPrice={list.value}
                  name={name}
                />
              )
            )
          : individualProducts.map(
              ({ name, barcode, internalId, prices: { cash, list } }) => (
                <PriceTag
                  key={internalId}
                  barCode={barcode}
                  cashPrice={cash.value}
                  internalId={internalId}
                  listPrice={list.value}
                  name={name}
                />
              )
            )}
      </Box>
    </>
  );
}
export default PriceTagGenerator;
