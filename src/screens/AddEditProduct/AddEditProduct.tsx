import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useParams, useSubmit } from 'react-router-dom';
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
  const ref = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const { control, watch, formState, setValue, handleSubmit } =
    useForm<Product>({
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

  const checkForErrors = () => {
    const errorsArray = Object.keys(errors);
    if (errorsArray.length !== 0) {
      const input =
        document.querySelector(`input[name=${errorsArray[0]}]`) ||
        document.querySelector(`textarea[name=${errorsArray[0]}]`);

      if (input) {
        input?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }

      return;
    }

    if (watch('imageURL').filter(Boolean).length === 0) {
      const imageButton = document.getElementById('upload-button');

      imageButton?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
    }

    submit(ref.current);
  };

  return (
    <Container>
      {import.meta.env.VITE_LOCAL_ENV && (
        <Button onClick={fillFakeData}>Fill with fake data</Button>
      )}

      <Form
        noValidate
        action='addProduct'
        method='post'
        ref={ref}
        onSubmit={handleSubmit(checkForErrors)}
      >
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
