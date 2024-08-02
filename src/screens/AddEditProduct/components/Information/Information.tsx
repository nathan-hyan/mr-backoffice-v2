import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';
import {
  Autocomplete,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import type { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import type { LoaderData } from '~screens/AddEditProduct/AddEditProduct.loader';
import { PRODUCT_FORM } from '~screens/AddEditProduct/constants';

import ImageSelection from './components/ImageSelection/ImageSelection';
import { generateBarcode, getSubcategories } from './utils';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  errors: FieldErrors<Product>;
  setValue: UseFormSetValue<Product>;
}

function Information({ control, watch, errors, setValue }: Props) {
  const { category } = useLoaderData() as LoaderData;
  const subCategories = getSubcategories(watch('category'), category);

  const images = watch('imageURL').filter(Boolean);

  const handleGenerateBarcode = () => {
    const barcode = generateBarcode();
    setValue('barcode', barcode);
  };

  return (
    <>
      <Typography sx={{ mt: 5 }} fontWeight='bold'>
        Información
      </Typography>

      <Divider sx={{ my: 2 }} />

      {PRODUCT_FORM.map((item) => (
        <CustomInput
          key={item.id}
          control={control}
          error={errors[item.name]}
          {...item}
        />
      ))}

      <CustomInput
        control={control}
        label='Código de barras'
        name='barcode'
        type={InputType.Text}
        inputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='generate barcode'
                onClick={handleGenerateBarcode}
                edge='end'
              >
                <CachedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Controller
        control={control}
        name='category'
        rules={{
          required: {
            value: true,
            message: 'Este campo es requerido',
          },
        }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(_, value) => {
              field.onChange(value?.value);
            }}
            value={{
              value: field.value,
              label: category.find(({ id }) => id === field.value)?.name || '',
            }}
            disablePortal
            id='combo-box-demo'
            options={[
              { value: '', label: '' },
              ...category.map(({ id, name }) => ({
                value: id || 0,
                label: name || '',
              })),
            ]}
            isOptionEqualToValue={(opt, value) => {
              return JSON.stringify(opt) === JSON.stringify(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name='category'
                required
                type={InputType.Text}
                label='Categoría'
                error={Boolean(errors.category)}
                helperText={errors.category?.message}
              />
            )}
          />
        )}
      />

      <Controller
        control={control}
        name='subCategory'
        rules={{
          required: {
            value: true,
            message: 'Este campo es requerido',
          },
        }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(_, value) => {
              field.onChange(value?.value);
            }}
            isOptionEqualToValue={(opt, value) => {
              return JSON.stringify(opt) === JSON.stringify(value);
            }}
            value={{
              value: Number(field.value),
              label:
                subCategories.find(
                  ({ internalId }) => internalId === Number(field.value)
                )?.name || '',
            }}
            disablePortal
            id='combo-box-demo'
            options={[
              {
                value: 0,
                label: '',
              },
              ...subCategories.map(({ internalId, name }) => ({
                value: internalId || 0,
                label: name || '',
              })),
            ]}
            renderInput={(params) => (
              <TextField
                {...params}
                name='subCategory'
                type={InputType.Text}
                required
                label='Sub Categoría'
                error={Boolean(errors.subCategory)}
                helperText={errors.subCategory?.message}
              />
            )}
          />
        )}
      />

      <Divider sx={{ mt: 3 }} />

      <ImageSelection data={images} setValue={setValue} watch={watch} />
      <input
        type='text'
        name='imageURL'
        hidden
        readOnly
        value={JSON.stringify(images)}
      />
    </>
  );
}
export default Information;
