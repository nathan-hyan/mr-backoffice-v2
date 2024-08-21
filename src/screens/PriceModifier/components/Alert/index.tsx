import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Product } from 'types/data';

interface Props {
  open: boolean;
  handleClose: () => void;
  onClick: () => void;
}

function Alert({ open, handleClose, onClick }: Props) {
  // TODO: Fix!
  const productList: Product[] = [];
  const productCount = productList.length;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {`Seguro que desea modificar ${productCount} productos?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Ejecutar esta accion modificara el precio de todos los productos en la
          base de datos. Esta seguro de que desea continuar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={onClick} autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Alert;
