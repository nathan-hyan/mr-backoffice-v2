import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  AddCircleRounded,
  CancelRounded,
  DeleteForeverRounded,
  SaveAltRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import type { Category } from 'types/data';

interface Props {
  show: boolean;
  handleClose: () => void;
  submitCategory: (data: Category) => void;
  isLoading: boolean;
}

interface IAddCategory {
  name: string;
  internalId: number;
  subCategories?: {
    name: '';
    internalId: number;
  }[];
}

function AddCategory({ show, handleClose, submitCategory, isLoading }: Props) {
  const { handleSubmit, control, formState, reset } = useForm<IAddCategory>({
    defaultValues: {
      name: '',
      subCategories: [
        {
          name: '',
        },
      ],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subCategories',
  });

  const onSubmit = (data: IAddCategory) => {
    submitCategory(data);

    reset();
    handleClose();
  };

  const handleCloseAndCancel = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleCloseAndCancel} fullWidth maxWidth='lg'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>Agregar categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los siguientes datos para poder crear una categoría
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
                label='Nombre de la categoria'
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                sx={{ mt: 3 }}
                variant='outlined'
              />
            )}
          />

          <Divider sx={{ my: 3 }} />
          <Typography variant='body1'>Agregar subcategorias:</Typography>
          {fields.map((input, index) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                mt: 3,
              }}
              key={input.id}
            >
              <Controller
                name={`subCategories.${index}.name`}
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
                    label='Nombre de la sub-categoría'
                    required
                    error={
                      errors.subCategories &&
                      !!errors.subCategories[index]?.name
                    }
                    helperText={
                      errors.subCategories &&
                      errors.subCategories[index]?.name?.message
                    }
                    fullWidth
                    variant='outlined'
                  />
                )}
              />
              {fields.length > 1 && (
                <IconButton
                  size='small'
                  color='error'
                  sx={{ width: '40px', height: '40px' }}
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <DeleteForeverRounded />
                </IconButton>
              )}
            </Box>
          ))}
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button
            variant='outlined'
            startIcon={<CancelRounded />}
            color='error'
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant='outlined'
            startIcon={<AddCircleRounded />}
            color='primary'
            onClick={() =>
              append({
                name: '',
                internalId: 0,
              })
            }
            disabled={isLoading}
          >
            Agregar otra sub-categoría
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
export default AddCategory;
