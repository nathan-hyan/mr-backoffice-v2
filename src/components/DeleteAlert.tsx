import { useState } from 'react';
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
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  stringToMatch: string;
}

function DeleteAlert({ open, onClose, onDelete, stringToMatch }: Props) {
  const [categoryName, setCategoryName] = useState('');

  const handleClose = () => {
    setCategoryName('');
    onClose();
  };

  const handleDelete = () => {
    setCategoryName('');
    onDelete();
  };

  return stringToMatch ? (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id='alert-dialog-title'>
        Seguro desea eliminar {stringToMatch}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>
          Al ejecutar esta acción, eliminaria el item de manera permanente. Para
          prevenir errores, por favor, escriba el nombre de el item debajo para
          continuar
        </DialogContentText>
        <TextField
          fullWidth
          label={`Ingrese aqui el texto: ${stringToMatch}`}
          error={stringToMatch !== categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          value={categoryName}
          placeholder={stringToMatch}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleDelete}
          autoFocus
          disabled={stringToMatch !== categoryName}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}
export default DeleteAlert;
