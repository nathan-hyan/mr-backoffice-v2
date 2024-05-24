import { DevTool } from '@hookform/devtools';
import { CancelRounded, SaveAltRounded } from '@mui/icons-material';
import { Button, Container } from '@mui/material';

import useProductModal from '~components/AddProductModal/hook';

import {
  Dimensions,
  KioskInformation,
  Prices,
  Specifications,
  Variants,
} from './components';
import Information from './components/Information/Information';
import Stock from './components/Stock/Stock';

function AddEditProduct() {
  const {
    fillFakeData,
    handleCancel,
    onSubmit,
    checkForErrors,
    handleSubmit,
    control,
    creatingLoading,
    errors,
    setValue,
    watch,
  } = useProductModal({
    show: true,
    onClose: () => {},
  });

  return (
    <>
      <Container sx={{ mt: 10 }}>
        {import.meta.env.VITE_LOCAL_ENV && (
          <Button onClick={fillFakeData}>Fill with fake data</Button>
        )}

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            <Prices control={control} errors={errors} />
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
        </form>
      </Container>

      <DevTool control={control} />
    </>
  );
}
export default AddEditProduct;
