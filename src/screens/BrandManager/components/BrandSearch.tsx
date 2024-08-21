import { Controller, useForm } from 'react-hook-form';
import { ArrowForward, HighlightOff } from '@mui/icons-material';
import { IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { Brand } from 'types/data';
import { Nullable, StateDispatch } from 'vite-env';

type BrandType = Nullable<Brand & { id: string }>;

interface Props {
  dataCopy: BrandType[];
  setData: StateDispatch<Brand>;
}

function BrandSearch({ dataCopy, setData }: Props) {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>({
    defaultValues: { name: '' },
    mode: 'onSubmit',
  });

  const performSearch = (criteria: { name: string }) => {
    const newData = dataCopy.filter((currentBrand) =>
      currentBrand?.name
        .toLowerCase()
        .includes(criteria.name.toLocaleLowerCase())
    );

    setData(newData);
  };

  const handleClearSearch = () => {
    reset();
    setData(dataCopy);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form noValidate onSubmit={handleSubmit(performSearch)}>
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
              label='Buscar una marca'
              required
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              fullWidth
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton color='warning' onClick={handleClearSearch}>
                      <HighlightOff />
                    </IconButton>
                    <IconButton color='primary' type='submit'>
                      <ArrowForward />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </form>
    </Paper>
  );
}
export default BrandSearch;
