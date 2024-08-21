import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Form, useNavigation, useParams, useSubmit } from 'react-router-dom';
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

import { requiredField } from '../../constants';
import { styles } from './AddSubCategory.styles';
import {
  defaultSubCategories as defaultValues,
  IAddSubCategories,
} from './constants';

interface Props {
  show: boolean;
  handleClose: () => void;
}

function AddSubCategory({ show, handleClose }: Props) {
  const { state } = useNavigation();
  const { id } = useParams() as { id: string };
  const submit = useSubmit();
  const { control, formState, handleSubmit } = useForm<IAddSubCategories>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subCategories',
  });

  const isLoading = state === 'submitting';
  const { errors } = formState;

  const onSubmit = (data: IAddSubCategories) => {
    const formData = new FormData();

    if (data.subCategories?.length && data.subCategories?.length > 0) {
      data.subCategories.forEach((item, index) => {
        formData.append(`subCategories.${index}.name`, item.name);
      });
    }

    submit(formData, {
      action: `/categoryManager/addSubcategory/${id}`,
      method: 'post',
    });

    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth='lg'>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
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
