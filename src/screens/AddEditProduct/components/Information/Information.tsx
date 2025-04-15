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

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import { useProducts } from '~contexts/Products';
import { PRODUCT_FORM } from '~screens/AddEditProduct/constants';

import ImageSelection from './components/ImageSelection/ImageSelection';
import { generateBarcode } from './utils';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  errors: FieldErrors<Product>;
  setValue: UseFormSetValue<Product>;
}

function Information({ control, watch, errors, setValue }: Props) {
  const { categories, getSubcategories, getSubSubcategories } = useProducts();

  const subCategories = getSubcategories(watch('category'));
  const subSubCategories = getSubSubcategories(
    watch('category'),
    watch('subCategory')
  );

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
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(_, value) => field.onChange(value?.value)}
            value={{
              value: field.value,
              label:
                categories.find(({ id }) => id === field.value)?.name || '',
            }}
            disablePortal
            id='combo-box-category'
            options={[
              { value: '', label: '' },
              ...categories.map(({ id, name }) => ({
                value: id || 0,
                label: name || '',
              })),
            ]}
            isOptionEqualToValue={(opt, value) => opt.value === value.value}
            renderInput={(params) => (
              <TextField
                {...params}
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
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(_, value) => field.onChange(value?.value)}
            value={{
              value: Number(field.value),
              label:
                subCategories.find(
                  ({ internalId }) => internalId === Number(field.value)
                )?.name || '',
            }}
            disablePortal
            id='combo-box-subcategory'
            options={[
              { value: 0, label: '' },
              ...subCategories.map(({ internalId, name }) => ({
                value: internalId || 0,
                label: name || '',
              })),
            ]}
            isOptionEqualToValue={(opt, value) => opt.value === value.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Sub Categoría'
                error={Boolean(errors.subCategory)}
                helperText={errors.subCategory?.message}
              />
            )}
          />
        )}
      />

      <Controller
        control={control}
        name='subSubCategories'
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(_, value) => field.onChange(value?.value || 0)}
            value={{
              value: Number(field.value),
              label:
                subSubCategories.find(
                  ({ internalId }) => internalId === Number(field.value)
                )?.name || '',
            }}
            disablePortal
            id='combo-box-subsubcategory'
            options={[
              { value: 0, label: '' },
              ...subSubCategories.map(({ internalId, name }) => ({
                value: internalId || 0,
                label: name || '',
              })),
            ]}
            isOptionEqualToValue={(opt, value) => opt.value === value.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Sub Sub Categoría'
                error={Boolean(errors.subSubCategories)}
                helperText={errors.subSubCategories?.message}
              />
            )}
          />
        )}
      />

      <Divider sx={{ mt: 3 }} />

      <ImageSelection data={images} setValue={setValue} watch={watch} />
    </>
  );
}

export default Information;
