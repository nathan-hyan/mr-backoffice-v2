import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import CachedIcon from '@mui/icons-material/Cached';
import {
  Autocomplete,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Product } from 'types/data';

import { PRODUCT_FORM } from '~components/AddProductModal/constants';
import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import { useProducts } from '~contexts/Products';

import ImageSelection from './components/ImageSelection/ImageSelection';
import { generateBarcode } from './utils';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  errors: FieldErrors<Product>;
  setValue: UseFormSetValue<Product>;
}

function Information({ control, watch, errors, setValue }: Props) {
  const { categories, getSubcategories } = useProducts();
  const subCategories = getSubcategories(watch('category'));
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
        <CustomInput key={item.id} control={control} {...item} />
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
                aria-label='toggle password visibility'
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
              label:
                categories.find(({ id }) => id === field.value)?.name || '',
            }}
            disablePortal
            id='combo-box-demo'
            options={categories.map(({ id, name }) => ({
              value: id || '',
              label: name,
            }))}
            renderInput={(params) => (
              <TextField
                {...params}
                required
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
            value={{
              value: Number(field.value),
              label:
                subCategories.find(
                  ({ internalId }) => internalId === Number(field.value)
                )?.name || '',
            }}
            disablePortal
            id='combo-box-demo'
            options={subCategories.map(({ internalId, name }) => ({
              value: internalId,
              label: name,
            }))}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label='Sub Categoría'
                error={Boolean(errors.subCategory)}
                helperText={errors.subCategory?.message}
              />
            )}
          />
        )}
      />

      {/* <CustomSelect
        data={categories.map(({ id, name }) => ({
          value: id || '',
          optionName: name,
        }))}
        label='Categoria'
        name='category'
        control={control}
        defaultValue=''
        error={errors.category}
        required
      />

      <CustomSelect
        data={subCategories.map(({ internalId, name }) => ({
          value: internalId,
          optionName: name,
        }))}
        label='Sub-Categoria'
        name='subCategory'
        control={control}
        defaultValue=''
        error={errors.subCategory}
        required
      /> */}

      <Divider sx={{ mt: 3 }} />

      <ImageSelection data={images} setValue={setValue} watch={watch} />
    </>
  );
}
export default Information;
