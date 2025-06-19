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

interface IAddSubSubCategories {
  subSubCategories: { name: string }[];
}

interface Props {
  show: boolean;
  handleClose: () => void;
  isLoading: boolean;
  addSubSubCategory: (data: { name: string }[]) => void;
}

function AddSubSubCategory({
  show,
  handleClose,
  isLoading,
  addSubSubCategory,
}: Props) {
  const { handleSubmit, control, formState, reset } =
    useForm<IAddSubSubCategories>({
      defaultValues: {
        subSubCategories: [{ name: '' }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subSubCategories',
  });

  const { errors } = formState;

  const onSubmit = (data: IAddSubSubCategories) => {
    const validData = data.subSubCategories.filter(
      (item) => item.name.trim() !== ''
    );
    addSubSubCategory(validData);
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
        <DialogTitle>Agregar Sub-Sub-categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los siguientes datos para poder crear una sub-sub-categoría
          </DialogContentText>
          {fields.map((input, index) => (
            <Box
              key={input.id}
              sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}
            >
              <Controller
                name={`subSubCategories.${index}.name`}
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
                    label='Nombre de la sub‑subcategoría'
                    required
                    error={
                      !!(
                        errors.subSubCategories &&
                        errors.subSubCategories[index]?.name
                      )
                    }
                    helperText={
                      errors.subSubCategories &&
                      errors.subSubCategories[index]?.name?.message
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
            onClick={() => append({ name: '' })}
            disabled={isLoading}
          >
            Agregar otra sub‑subcategoría
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

export default AddSubSubCategory;
