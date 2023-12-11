import { DevTool } from '@hookform/devtools';
import { CancelRounded, SaveAltRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Product } from 'types/data';
import { Nullable } from 'vite-env';

import {
  Dimensions,
  KioskInformation,
  Prices,
  Specifications,
  Variants,
} from './components';
import Information from './components/Information/Information';
import useProductModal from './hook';

interface Props {
  show: boolean;
  onClose: () => void;
  productToEdit?: Nullable<Product>;
}

function AddProductModal({ show, onClose, productToEdit }: Props) {
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
  } = useProductModal({ show, onClose, productToEdit });

  return (
    <Dialog open={show} onClose={handleCancel} fullWidth maxWidth='lg'>
      {import.meta.env.VITE_LOCAL_ENV && (
        <Button onClick={fillFakeData}>Fill with fake data</Button>
      )}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Crear producto</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Ingrese los siguientes datos para poder crear un producto
          </DialogContentText>

          <Box
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
            <Prices control={control} errors={errors} />
            <Variants control={control} errors={errors} />
            <Specifications control={control} errors={errors} />
            <KioskInformation control={control} errors={errors} />
            <Dimensions control={control} errors={errors} />
          </Box>
        </DialogContent>

        <DialogActions sx={{ m: 2 }}>
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
        </DialogActions>
      </form>
      <DevTool control={control} />
    </Dialog>
  );
}

AddProductModal.defaultProps = {
  productToEdit: null,
};

export default AddProductModal;
