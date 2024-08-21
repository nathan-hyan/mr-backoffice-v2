import { Form } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';

import { brandQuery } from '~services/brands';

import { getFormProps } from './utils';

interface Props {
  show: boolean;
  onClose: () => void;
  brandId?: string;
}

function AddBrandModal({ show, onClose, brandId = undefined }: Props) {
  const { data } = useSuspenseQuery(brandQuery({ searchTerm: null }));

  const currentBrand = data.find((brand) => brand?.id === brandId);
  const formProps = getFormProps(brandId);

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth='lg'>
      <DialogTitle id='alert-add-brand'>Agregar una marca</DialogTitle>

      <Form method={formProps.method} action={formProps.action}>
        <DialogContent>
          <DialogContentText id='alert-brand-description'>
            Ingrese el nombre de una marca en el siguiente campo
          </DialogContentText>

          <TextField
            sx={{ mt: 3 }}
            label='Nombre de la marca'
            name='name'
            defaultValue={currentBrand?.name}
            required
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose} type='submit'>
            Agregar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
export default AddBrandModal;
