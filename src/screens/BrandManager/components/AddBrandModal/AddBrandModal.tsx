import { useEffect } from 'react';
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
import type { Brand } from 'types/data';
import { Nullable } from 'vite-env';

interface Props {
  show: boolean;
  addDocument: (arg0: IBrandForm) => void;
  updateDocument: (arg0: string) => void;
  documentToUpdate: Nullable<Brand>;
  onCancel: () => void;
}

interface IBrandForm {
  name: string;
}

function AddBrandModal({
  show,
  onCancel,
  addDocument,
  updateDocument,
  documentToUpdate,
}: Props) {
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<IBrandForm>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: IBrandForm) => {
    if (documentToUpdate) {
      updateDocument(data.name);
    } else {
      addDocument(data);
    }
    reset();
    onCancel();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  useEffect(() => {
    if (documentToUpdate) {
      setValue('name', documentToUpdate.name);
    }
  }, [documentToUpdate, setValue]);

  return (
    <Dialog open={show} onClose={handleCancel} fullWidth maxWidth='lg'>
      <DialogTitle id='alert-dialog-title'>Agregar una marca</DialogTitle>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Ingrese el nombre de una marca en el siguiente campo
          </DialogContentText>

          <Controller
            name='name'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ mt: 3 }}
                label='Nombre de la marca'
                required
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth
                variant='standard'
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button autoFocus type='submit'>
            Agregar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
export default AddBrandModal;
