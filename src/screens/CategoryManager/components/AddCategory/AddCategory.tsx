import { Controller, Form, useFieldArray, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
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

import { requiredField } from '../../constants';
import { styles } from './AddCategory.styles';
import {
  defaultCategory as defaultValues,
  type IAddCategory,
} from './constants';

interface Props {
  show: boolean;
  handleClose: () => void;
}

function AddCategory({ show, handleClose }: Props) {
  const { state } = useLocation();
  const { control, formState } = useForm<IAddCategory>({
    defaultValues,
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subCategories',
  });

  const isLoading = state === 'submitting';

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth='lg'>
      <Form noValidate>
        <DialogTitle>Agregar categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los siguientes datos para poder crear una categoría
          </DialogContentText>

          <Controller
            name='name'
            control={control}
            rules={requiredField}
            render={({ field }) => (
              <TextField
                {...field}
                label='Nombre de la categoria'
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                sx={styles.categoryInput}
                variant='outlined'
              />
            )}
          />

          <Divider sx={styles.divider} />

          <Typography variant='body1'>Agregar subcategorias:</Typography>

          {fields.map((input, index) => (
            <Box sx={styles.subcategoryBox} key={input.id}>
              <Controller
                name={`subCategories.${index}.name`}
                control={control}
                rules={requiredField}
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
                  sx={styles.removeSubcategoryButton}
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
      </Form>
    </Dialog>
  );
}
export default AddCategory;
