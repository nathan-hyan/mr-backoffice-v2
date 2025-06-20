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
  IconButton,
  TextField,
} from '@mui/material';

interface IAddSubCategories {
  subCategories: { name: string }[];
}

interface Props {
  show: boolean;
  handleClose: () => void;
  isLoading: boolean;
  addSubcategory: (data: IAddSubCategories) => void;
}

function AddSubCategory({
  show,
  handleClose,
  isLoading,
  addSubcategory,
}: Props) {
  const { handleSubmit, control, formState, reset } =
    useForm<IAddSubCategories>({
      defaultValues: {
        subCategories: [
          {
            name: '',
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subCategories',
  });

  const { errors } = formState;

  const onSubmit = (data: IAddSubCategories) => {
    const filteredData = {
      subCategories: data.subCategories.filter(
        (item) => item.name.trim() !== ''
      ),
    };

    addSubcategory(filteredData);
    reset();
    handleClose();
  };

  const handleCloseAndCancel = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleCloseAndCancel} fullWidth maxWidth='lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Agregar Sub-categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los siguientes datos para poder crear una subcategoría.
          </DialogContentText>

          {fields.map((input, index) => (
            <Box
              key={input.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                mt: 3,
              }}
            >
              <Controller
                name={`subCategories.${index}.name`}
                control={control}
                rules={{}}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Nombre de la sub-categoría'
                    fullWidth
                    variant='outlined'
                    error={
                      errors.subCategories &&
                      !!errors.subCategories[index]?.name
                    }
                    helperText={
                      errors.subCategories &&
                      errors.subCategories[index]?.name?.message
                    }
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
            onClick={handleCloseAndCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant='outlined'
            startIcon={<AddCircleRounded />}
            color='primary'
            onClick={() => append({ name: '' })}
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

export default AddSubCategory;
