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

import ImageSelection from '../../../AddEditProduct/components/Information/components/ImageSelection/ImageSelection';

interface Props {
  show: boolean;
  handleClose: () => void;
  submitDepartment: (data: { name: string; imageURL?: string[] }) => void;
  isLoading: boolean;
  initialData?: { name: string; imageURL?: string[] }; // ✅ nuevo
}

function AddDepartment({
  show,
  handleClose,
  submitDepartment,
  isLoading,
  initialData = undefined,
}: Props) {
  const { handleSubmit, control, formState, reset, setValue, watch } = useForm<{
    name: string;
    imageURL: string[];
  }>({
    defaultValues: {
      name: initialData?.name || '',
      imageURL: initialData?.imageURL || [],
    },
  });

  const { errors } = formState;

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      imageURL: initialData?.imageURL || [],
    });
  }, [initialData, reset]);

  const onSubmit = (data: { name: string; imageURL: string[] }) => {
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
        <DialogTitle>
          {initialData ? 'Editar departamento' : 'Agregar departamento'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {initialData
              ? 'Actualice los datos del departamento.'
              : 'Ingrese el nombre del departamento.'}
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

          <Controller
            control={control}
            name='imageURL'
            render={({ field }) => (
              <ImageSelection
                data={field.value || []}
                setValue={setValue}
                watch={watch}
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
