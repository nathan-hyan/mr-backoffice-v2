import { useEffect } from 'react';
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
import { Category } from 'types/data';

import ImageSelection from '../../../AddEditProduct/components/Information/components/ImageSelection/ImageSelection';

interface Props {
  show: boolean;
  handleClose: () => void;
  submitCategory: (data: Category) => void;
  isLoading: boolean;
  initialData?: Category;
}

interface IAddCategory {
  name: string;
  internalId: number;
  imageURL: string[];
  initialData?: Category;

  subCategories?: {
    name: string;
    internalId: number;
  }[];
}

function AddCategory({
  show,
  handleClose,
  submitCategory,
  isLoading,
  initialData = undefined,
}: Props) {
  const isEditing = !!initialData;

  const { handleSubmit, control, formState, reset, setValue, watch } =
    useForm<IAddCategory>({
      defaultValues: {
        name: initialData?.name || '',
        imageURL: initialData?.imageURL || [],
        subCategories:
          initialData?.subCategories && initialData.subCategories.length > 0
            ? initialData.subCategories
            : [{ name: '', internalId: 0 }],
      },
    });

  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subCategories',
  });

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      imageURL: initialData?.imageURL || [],
      subCategories:
        initialData?.subCategories && initialData.subCategories.length > 0
          ? initialData.subCategories
          : [{ name: '', internalId: 0 }],
    });
  }, [initialData, reset]);

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
        <DialogTitle>
          {isEditing ? 'Editar categoría' : 'Agregar categoría'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los siguientes datos{' '}
            {isEditing
              ? 'para actualizar la categoría'
              : 'para crear una categoría'}
            .
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
                label='Nombre de la categoría'
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

          <Divider sx={{ my: 3 }} />

          <Typography variant='body1'>Agregar subcategorías:</Typography>
          {fields.map((input, index) => (
            <Box
              key={input.id}
              sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}
            >
              <Controller
                name={`subCategories.${index}.name`}
                control={control}
                rules={
                  isEditing
                    ? {}
                    : {
                        required: {
                          value: true,
                          message: 'Este campo es obligatorio',
                        },
                      }
                }
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Nombre de la sub-categoría'
                    required={!isEditing}
                    error={
                      !!(
                        errors.subCategories &&
                        errors.subCategories[index]?.name
                      )
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
                  onClick={() => remove(index)}
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
            onClick={handleCloseAndCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant='outlined'
            startIcon={<AddCircleRounded />}
            color='primary'
            onClick={() => append({ name: '', internalId: 0 })}
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
