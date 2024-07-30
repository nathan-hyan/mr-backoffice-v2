// TODO: Fix price modifier

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Paper } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import type { Product } from 'types/data';

import { ROUTES } from '~config/routes';
import { FirestoreCollections } from '~constants/firebase';
import { GACategories, GATypes } from '~constants/gaTagTypes';
import { useProducts } from '~contexts/Products';
import { useFirestore, useGATag } from '~hooks';

import Alert from './components/Alert';
import Form from './components/Form';
import { DEFAULT_VALUES, PriceModifierForm } from './constants';
import { batchUpdateData } from './utils';

function PriceModifier() {
  const [showAlert, setShowAlert] = useState(false);
  const [newData, setNewData] = useState<Product[]>([]);
  const [customPercent, setCustomPercent] = useState(0);
  const { tagAction } = useGATag();
  const navigate = useNavigate();

  const { productList } = useProducts();
  const { updateDocument } = useFirestore(FirestoreCollections.Products);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PriceModifierForm>({ defaultValues: DEFAULT_VALUES });

  const toggleShowAlert = () => {
    if (showAlert) {
      tagAction(
        GACategories.Event,
        GATypes.Click,
        `Canceled price modification`
      );
    }

    setShowAlert((prevState) => {
      return !prevState;
    });
  };

  const onSubmit = (e: PriceModifierForm) => {
    tagAction(
      GACategories.Prices,
      GATypes.SubmittedForm,
      `${e.type === 'incr' ? 'Incremented' : 'Decremented'} prices`
    );
    const result = batchUpdateData(e, productList);
    setNewData(result);

    toggleShowAlert();
  };

  const modifyPrices = () => {
    const totalProductCount = newData.length;
    const percentDivider = 100 / totalProductCount;

    newData.forEach((product) => {
      updateDocument(
        product.id,
        product,
        () => {
          setCustomPercent((prevState) => {
            return prevState + percentDivider >= 100
              ? 100
              : Math.ceil(prevState + percentDivider);
          });
        },
        true
      );

      if (customPercent === 100) {
        enqueueSnackbar('Proceso finalizado!', {
          variant: 'success',
        });
      }
    });

    toggleShowAlert();
  };

  const goBack = () => {
    navigate(ROUTES()[4].path);
  };

  return (
    <>
      <Alert
        onClick={modifyPrices}
        open={showAlert}
        handleClose={toggleShowAlert}
      />
      <Paper elevation={3} sx={{ padding: '1rem 2rem' }}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form
            control={control}
            errors={errors}
            disabled={customPercent > 0 && customPercent < 100}
            handleCancel={goBack}
          />
        </form>

        {customPercent > 0 && customPercent < 100 && (
          <LinearProgress
            variant='determinate'
            value={customPercent}
            sx={{ mt: '1rem' }}
          />
        )}
      </Paper>
    </>
  );
}
export default PriceModifier;
