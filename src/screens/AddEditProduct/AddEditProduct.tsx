import { useForm } from 'react-hook-form';
import { Form, useParams } from 'react-router-dom';
import { CancelRounded, SaveAltRounded } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import type { Product } from 'types/data';

import { styles } from './AddEditProduct.styles';
import {
  Dimensions,
  Information,
  KioskInformation,
  Prices,
  Specifications,
  Stock,
  Variants,
} from './components';
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
    // checkForErrors,
    // handleSubmit,
    // control,
    creatingLoading,
    // errors,
    // setValue,
    // watch,
  } = useProductModal({
    productIdToEdit: editMode ? id : null,
  });

  return (
    <Container>
      {import.meta.env.VITE_LOCAL_ENV && (
        <Button onClick={fillFakeData}>Fill with fake data</Button>
      )}

      <Form action='addProduct' method='post'>
        <Container sx={styles.container}>
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
          >
            Guardar
          </Button>
        </Container>
      </Form>
    </Container>
  );
}
export default AddEditProduct;
