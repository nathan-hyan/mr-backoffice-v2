import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CancelRounded, SaveAltRounded } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Tag } from 'types/data';

interface Props {
  show: boolean;
  handleClose: () => void;
  submitTag: (data: Tag) => void;
  isLoading: boolean;
  initialData?: Tag;
}

function AddTagModal({
  show,
  handleClose,
  submitTag,
  isLoading,
  initialData = undefined,
}: Props) {
  const isEditing = !!initialData;

  const { handleSubmit, control, formState, reset } = useForm<Tag>({
    defaultValues: {
      tag: initialData?.tag || '',
    },
  });

  const { errors } = formState;

  useEffect(() => {
    reset({ tag: initialData?.tag || '' });
  }, [initialData, reset]);

  const onSubmit = (data: Tag) => {
    submitTag(data);
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
        <DialogTitle>{isEditing ? 'Editar tag' : 'Agregar tag'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditing
              ? 'Modifique el nombre del tag'
              : 'Ingrese el nombre del nuevo tag'}
            .
          </DialogContentText>

          <Controller
            name='tag'
            control={control}
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Nombre del tag'
                required
                error={!!errors.tag}
                helperText={errors.tag?.message}
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
            startIcon={<CancelRounded />}
            color='error'
            onClick={handleCloseAndCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            variant='contained'
            startIcon={<SaveAltRounded />}
            disabled={isLoading}
          >
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddTagModal;
