import { FormEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useParams } from 'react-router-dom';
import { CancelRounded, SaveAltRounded } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import { Product } from 'types/data';

import {
  Dimensions,
  KioskInformation,
  Prices,
  Specifications,
  Variants,
} from './components';
import Information from './components/Information/Information';
import Stock from './components/Stock/Stock';
import { EMPTY_FORM } from './constants';
import useProductModal from './hook';
import { fabricateFakeData } from './utils';

function AddEditProduct({ editMode = false }: { editMode?: boolean }) {
  const { id } = useParams();

  const { control, watch, formState, setValue } = useForm<Product>({
    defaultValues: EMPTY_FORM,
    mode: 'onChange',
  });

  const { errors } = formState;

  const fillFakeData = () => {
    fabricateFakeData().forEach(({ field, value }) => {
      setValue(field as keyof Product, value);
    });
  };

  const {
    // fillFakeData,
    handleCancel,
    // onSubmit,
    checkForErrors,
    // handleSubmit,
    // control,
    creatingLoading,
    // errors,
    // setValue,
    // watch,
  } = useProductModal({
    productIdToEdit: editMode ? id : null,
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      {import.meta.env.VITE_LOCAL_ENV && (
        <Button onClick={fillFakeData}>Fill with fake data</Button>
      )}

      <Form noValidate onSubmit={onSubmit}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Information
            setValue={setValue}
            control={control}
            watch={watch}
            errors={errors}
          />
          <Stock control={control} errors={errors} watch={watch} />
          <Prices control={control} errors={errors} watch={watch} />
          <Variants control={control} errors={errors} />
          <Specifications control={control} errors={errors} />
          <KioskInformation control={control} errors={errors} />
          <Dimensions control={control} errors={errors} />

          <hr />

          <Button
            variant='outlined'
            startIcon={<CancelRounded />}
            color='error'
            onClick={handleCancel}
            disabled={creatingLoading}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            variant='contained'
            startIcon={<SaveAltRounded />}
            disabled={creatingLoading}
            onClick={checkForErrors}
          >
            Guardar
          </Button>
        </Container>
      </Form>
    </Container>
  );
}
export default AddEditProduct;
