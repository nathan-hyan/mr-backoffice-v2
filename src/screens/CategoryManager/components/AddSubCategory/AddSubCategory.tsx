import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Form, useNavigation } from 'react-router-dom';
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
import type { Category } from 'types/data';

import { requiredField } from '../../constants';
import { styles } from './AddSubCategory.styles';
import {
  defaultSubCategories as defaultValues,
  IAddSubCategories,
} from './constants';

interface Props {
  show: boolean;
  handleClose: () => void;
  isLoading: boolean;
  addSubcategory: (arg0: Category) => void;
}

function AddSubCategory({ show, handleClose }: Props) {
  const { state } = useNavigation();
  const { control, formState } = useForm<IAddSubCategories>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subCategories',
  });

  const isLoading = state === 'submitting';
  const { errors } = formState;

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth='lg'>
      <Form>
        <DialogTitle>Agregar Sub-categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los siguientes datos para poder crear una categoría
          </DialogContentText>

          {fields.map((input, index) => (
            <Box sx={styles.fieldBox} key={input.id}>
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
        <DialogActions sx={styles.buttonContainer}>
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
export default AddSubCategory;
