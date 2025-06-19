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
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import CustomSelect from '~components/CustomSelect';
import { useProducts } from '~contexts/Products';
import { PRODUCT_FORM } from '~screens/AddEditProduct/constants';

import styles from './styles.module.scss';

import { generateBarcode } from './utils';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  errors: FieldErrors<Product>;
  setValue: UseFormSetValue<Product>;
}

function Information({ control, watch, errors, setValue }: Props) {
  const { categories, getSubcategories, getSubSubcategories, departments } =
    useProducts();
  const { brands } = useProducts();
  const selectedDepartment = watch('department');
  const subCategories = getSubcategories(watch('category'));
  const subSubCategories = getSubSubcategories(
    watch('category'),
    watch('subCategory')
  );

  const handleGenerateBarcode = () => {
    const barcode = generateBarcode();
    setValue('barcode', barcode);
  };

  const filteredCategories = categories.filter(
    (cat) => Number(cat.departmentId) === Number(selectedDepartment)
  );

  return (
    <div className={styles.container}>
      <Typography
        sx={{ mt: 5 }}
        marginBottom={2}
        color='#454545'
        fontWeight='bold'
      >
        Datos
      </Typography>
      <div className={styles.formContainer}>
        <CustomInput
          className={styles.customInput}
          InputLabelProps={{ shrink: true }}
          key={PRODUCT_FORM[0].id}
          control={control}
          error={errors[PRODUCT_FORM[0].name]}
          {...PRODUCT_FORM[0]}
        />

        <CustomInput
          className={styles.customInput}
          InputLabelProps={{ shrink: true }}
          control={control}
          label='Nombre ecommerce'
          name='ecommerceName'
          type={InputType.Text}
        />

        <div className={styles.categoriesContainer}>
          <div className={styles.categoriesFather}>
            <Controller
              control={control}
              name='department'
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value?.value)}
                  value={{
                    value: field.value,
                    label:
                      departments.find(
                        (department: { internalId: string; name: string }) =>
                          department.internalId === field.value
                      )?.name || '',
                  }}
                  disablePortal
                  id='combo-box-department'
                  options={[
                    { value: '', label: '' },
                    ...departments.map(
                      (department: { internalId: string; name: string }) => ({
                        value: department.internalId,
                        label: department.name,
                      })
                    ),
                  ]}
                  isOptionEqualToValue={(opt, value) =>
                    opt.value === value.value
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Departamento'
                      InputLabelProps={{ shrink: true }}
                      error={Boolean(errors.department)}
                      helperText={errors.department?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#000',
                          '& fieldset': {
                            borderColor: '#000',
                          },
                          '&:hover fieldset': {
                            borderColor: '#000',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#000',
                          },
                          '&.Mui-disabled fieldset': {
                            borderColor: '#000',
                          },
                          '& .MuiInputBase-root': {
                            height: 42,
                            minHeight: 42,
                            boxSizing: 'border-box',
                          },
                        },
                        '& .MuiInputBase-root': {
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                        },
                        '& .MuiInputBase-input': {
                          color: '#000',
                          WebkitTextFillColor: '#000',
                          backgroundColor: 'transparent',
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                          padding: '0 8px',
                          display: 'flex',
                          alignItems: 'center',
                        },
                        '& .MuiInputBase-input.Mui-disabled': {
                          color: '#000',
                          WebkitTextFillColor: '#000',
                          backgroundColor: 'transparent',
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                          padding: '0 8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: '#000',
                        },
                        '& .MuiInputLabel-root.Mui-disabled': {
                          color: '#000',
                        },
                        '& .Mui-focused': {
                          color: '#000',
                        },
                        '& .MuiAutocomplete-popupIndicator': {
                          color: '#000',
                        },
                      }}
                    />
                  )}
                />
              )}
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
                      filteredCategories.find(({ id }) => id === field.value)
                        ?.name || '',
                  }}
                  disablePortal
                  id='combo-box-category'
                  options={[
                    { value: '', label: '' },
                    ...filteredCategories.map(({ id, name }) => ({
                      value: id || 0,
                      label: name || '',
                    })),
                  ]}
                  isOptionEqualToValue={(opt, value) =>
                    opt.value === value.value
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Categoría'
                      InputLabelProps={{ shrink: true }}
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#000',
                          '& fieldset': {
                            borderColor: '#000',
                          },
                          '&:hover fieldset': {
                            borderColor: '#000',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#000',
                          },
                          '&.Mui-disabled fieldset': {
                            borderColor: '#000',
                          },
                          '& .MuiInputBase-root': {
                            height: 42,
                            minHeight: 42,
                            boxSizing: 'border-box',
                          },
                        },
                        '& .MuiInputBase-root': {
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                        },
                        '& .MuiInputBase-input': {
                          color: '#000',
                          WebkitTextFillColor: '#000',
                          backgroundColor: 'transparent',
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                          padding: '0 8px',
                          display: 'flex',
                          alignItems: 'center',
                        },
                        '& .MuiInputBase-input.Mui-disabled': {
                          color: '#000',
                          WebkitTextFillColor: '#000',
                          backgroundColor: 'transparent',
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                          padding: '0 8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: '#000',
                        },
                        '& .MuiInputLabel-root.Mui-disabled': {
                          color: '#000',
                        },
                        '& .Mui-focused': {
                          color: '#000',
                        },
                        '& .MuiAutocomplete-popupIndicator': {
                          color: '#000',
                        },
                      }}
                    />
                  )}
                />
              )}
            />
          </div>
          <div className={styles.categoriesFather}>
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
                  isOptionEqualToValue={(opt, value) =>
                    opt.value === value.value
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Sub Categoría'
                      InputLabelProps={{ shrink: true }}
                      error={Boolean(errors.subCategory)}
                      helperText={errors.subCategory?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#000',
                          '& fieldset': {
                            borderColor: '#000',
                          },
                          '&:hover fieldset': {
                            borderColor: '#000',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#000',
                          },
                          '&.Mui-disabled fieldset': {
                            borderColor: '#000',
                          },
                          '& .MuiInputBase-root': {
                            height: 42,
                            minHeight: 42,
                            boxSizing: 'border-box',
                          },
                        },
                        '& .MuiInputBase-root': {
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                        },
                        '& .MuiInputBase-input': {
                          color: '#000',
                          WebkitTextFillColor: '#000',
                          backgroundColor: 'transparent',
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                          padding: '0 8px',
                          display: 'flex',
                          alignItems: 'center',
                        },
                        '& .MuiInputBase-input.Mui-disabled': {
                          color: '#000',
                          WebkitTextFillColor: '#000',
                          backgroundColor: 'transparent',
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                          padding: '0 8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: '#000',
                        },
                        '& .MuiInputLabel-root.Mui-disabled': {
                          color: '#000',
                        },
                        '& .Mui-focused': {
                          color: '#000',
                        },
                        '& .MuiAutocomplete-popupIndicator': {
                          color: '#000',
                        },
                      }}
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
                  isOptionEqualToValue={(opt, value) =>
                    opt.value === value.value
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Sub Sub Categoría'
                      InputLabelProps={{ shrink: true }}
                      error={Boolean(errors.subSubCategories)}
                      helperText={errors.subSubCategories?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#000',
                          '& fieldset': {
                            borderColor: '#000',
                          },
                          '&:hover fieldset': {
                            borderColor: '#000',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#000',
                          },
                          '&.Mui-disabled fieldset': {
                            borderColor: '#000',
                          },
                          '& .MuiInputBase-root': {
                            height: 42,
                            minHeight: 42,
                            boxSizing: 'border-box',
                          },
                        },
                        '& .MuiInputBase-root': {
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                        },
                        '& .MuiInputBase-input': {
                          color: '#000',
                          WebkitTextFillColor: '#000',
                          backgroundColor: 'transparent',
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                          padding: '0 8px',
                          display: 'flex',
                          alignItems: 'center',
                        },
                        '& .MuiInputBase-input.Mui-disabled': {
                          color: '#000',
                          WebkitTextFillColor: '#000',
                          backgroundColor: 'transparent',
                          height: 42,
                          minHeight: 42,
                          boxSizing: 'border-box',
                          padding: '0 8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: '#000',
                        },
                        '& .MuiInputLabel-root.Mui-disabled': {
                          color: '#000',
                        },
                        '& .Mui-focused': {
                          color: '#000',
                        },
                        '& .MuiAutocomplete-popupIndicator': {
                          color: '#000',
                        },
                      }}
                    />
                  )}
                />
              )}
            />
          </div>
        </div>
        <CustomInput
          className={styles.customInput}
          control={control}
          label='Código de barras'
          name='barcode'
          InputLabelProps={{ shrink: true }}
          type={InputType.Text}
          inputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleGenerateBarcode}
                  edge='end'
                  sx={{ color: 'black' }}
                >
                  <CachedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={styles.selectsContainer}>
          <CustomSelect
            name='brand'
            control={control}
            error={errors.brand}
            variant='outlined'
            label='Marca'
            data={brands.map(({ name, id }) => ({
              optionName: name,
              value: id || '',
            }))}
            InputLabelProps={{ shrink: true }}
          />

          <CustomSelect
            name='stockOwner'
            control={control}
            error={errors.stockOwner}
            label='Dueño de stock'
            variant='outlined'
            data={[
              { optionName: 'Mundo Regalo', value: 'Mundo Regalo' },
              { optionName: 'mr Tienda', value: 'mr Tienda' },
            ]}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <CustomInput
          className={styles.customInputdescripcion}
          InputLabelProps={{ shrink: true }}
          key={PRODUCT_FORM[1].id}
          control={control}
          error={errors[PRODUCT_FORM[1].name]}
          {...PRODUCT_FORM[1]}
          multiline
          minRows={4}
        />
      </div>
    </div>
  );
}

export default Information;
