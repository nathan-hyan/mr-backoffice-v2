import { Controller, useForm } from 'react-hook-form';
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
  handleClose: () => void;
  submitDepartment: (data: { name: string }) => void;
  isLoading: boolean;
}

function AddDepartment({
  show,
  handleClose,
  submitDepartment,
  isLoading,
}: Props) {
  const { handleSubmit, control, formState, reset } = useForm<{ name: string }>(
    {
      defaultValues: { name: '' },
    }
  );
  const { errors } = formState;

  const onSubmit = (data: { name: string }) => {
    submitDepartment(data);
    reset();
    handleClose();
  };

  const handleCloseAndCancel = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleCloseAndCancel} fullWidth maxWidth='sm'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>Agregar departamento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese el nombre del departamento.
          </DialogContentText>
          <Controller
            name='name'
            control={control}
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Nombre del departamento'
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                sx={{ mt: 3 }}
                variant='outlined'
              />
            )}
          />
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button
            variant='outlined'
            color='error'
            onClick={handleCloseAndCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type='submit' variant='contained' disabled={isLoading}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddDepartment;
