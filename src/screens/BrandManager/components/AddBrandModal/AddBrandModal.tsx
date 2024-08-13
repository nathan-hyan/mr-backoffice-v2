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

interface Props {
  show: boolean;
  onClose: () => void;
}

function AddBrandModal({ show, onClose }: Props) {
  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth='lg'>
      <DialogTitle id='alert-add-brand'>Agregar una marca</DialogTitle>

      <Form method='POST' action='/brandManager/add'>
        <DialogContent>
          <DialogContentText id='alert-brand-description'>
            Ingrese el nombre de una marca en el siguiente campo
          </DialogContentText>

          <TextField
            sx={{ mt: 3 }}
            label='Nombre de la marca'
            name='name'
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
