import { Controller, useForm } from 'react-hook-form';
import { Form, useNavigation, useParams, useSubmit } from 'react-router-dom';
import { CancelRounded, SaveAltRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Category } from 'types/data';

import { categoryQuery } from '~services/categories';

import { requiredField } from '../../constants';
import { styles } from './RenameCategory.styles';

interface Props {
  show: boolean;
  handleClose: () => void;
}

function RenameCategory({ show, handleClose }: Props) {
  const { state } = useNavigation();
  const { id } = useParams() as { id: string };
  const { data } = useSuspenseQuery(categoryQuery(id)) as { data: Category };
  const submit = useSubmit();

  const { control, formState, handleSubmit, watch } = useForm<{ name: string }>(
    {
      defaultValues: { name: data.name },
    }
  );

  const isLoading = state === 'submitting';
  const { errors } = formState;

  const onSubmit = (newData: { name: string }) => {
    const formData = new FormData();

    formData.append('name', newData.name);

    submit(formData, {
      action: `/categoryManager/editCategory/${id}`,
      method: 'put',
    });

    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth='lg'>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Agregar Sub-categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese un nombre para la categoría
          </DialogContentText>

          <Box sx={styles.fieldBox}>
            <Controller
              name='name'
              control={control}
              rules={requiredField}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Nombre de la categoría'
                  required
                  error={errors.name && !!errors.name}
                  helperText={errors.name && errors.name.message}
                  fullWidth
                  variant='outlined'
                />
              )}
            />
          </Box>
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
            type='submit'
            variant='contained'
            startIcon={<SaveAltRounded />}
            disabled={
              isLoading ||
              watch('name').toLowerCase() === data.name.toLowerCase()
            }
          >
            Guardar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
export default RenameCategory;
