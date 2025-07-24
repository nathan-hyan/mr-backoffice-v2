import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormSetValue,
} from 'react-hook-form';
import { DeleteForeverRounded } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import { useProviders } from '~contexts/Providers';
import { PROVIDER_PRODUCT_CODE_FORM_EMPTY } from '~screens/AddEditProduct/constants';

import styles from './styles.module.scss';

interface Props {
  control: Control<Product, unknown>;
  errors: FieldErrors<Product>;
  setValue: UseFormSetValue<Product>;
}

function KioskInformation({ control, errors, setValue }: Props) {
  const { providers } = useProviders();

  const {
    fields: providerProductCodeFields,
    remove: providerProductCodeRemove,
    append: providerProductCodeAppend,
  } = useFieldArray({ control, name: 'providerProductCode' });

  return (
    <div className={styles.container}>
      <Typography
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#454545',
          paddingBottom: '5px',
        }}
        fontWeight='bold'
      >
        Proveedores
        <button
          className={styles.addButton}
          type='button'
          onClick={() =>
            providerProductCodeAppend(PROVIDER_PRODUCT_CODE_FORM_EMPTY)
          }
        >
          Agregar
        </button>
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {providerProductCodeFields.length > 0 ? (
        providerProductCodeFields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              gap: 2,
              display: 'flex',
              alignItems: 'center',
              paddingBottom: 3,
            }}
          >
            <Box sx={{ width: '50%' }}>
              <CustomInput
                name={`providerProductCode.${index}.id`}
                label='Id del producto'
                control={control}
                error={
                  errors.providerProductCode &&
                  errors.providerProductCode[index]?.id
                }
                type={InputType.Number}
              />
            </Box>

            <Box sx={{ width: '50%' }}>
              <Controller
                control={control}
                name={`providerProductCode.${index}.name`}
                render={({ field }) => (
                  <Autocomplete
                    options={providers.map((p) => ({
                      label: p.name,
                      id: p.id,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    }
                    onChange={(_, value) => {
                      field.onChange(value?.label || '');
                      setValue(
                        `providerProductCode.${index}.id`,
                        value?.id || ''
                      );
                    }}
                    value={
                      providers.find((p) => p.name === field.value)
                        ? { label: field.value, id: item.id }
                        : null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Nombre del proveedor'
                        variant='outlined'
                        sx={{
                          height: 42,
                          '& .MuiOutlinedInput-root': {
                            height: 42,
                            '& fieldset': {
                              borderColor: '#454545',
                            },
                            '&:hover fieldset': {
                              borderColor: '#454545',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#454545',
                            },
                          },
                          '& .MuiInputBase-input': {
                            height: '42px',
                            padding: '0 8px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#454545',
                          },
                          '& .MuiInputLabel-root': {
                            color: '#454545',
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#454545',
                          },
                          '& .MuiAutocomplete-popupIndicator': {
                            color: '#454545',
                          },
                        }}
                        error={Boolean(
                          errors.providerProductCode &&
                            errors.providerProductCode[index]?.name
                        )}
                        helperText={
                          errors.providerProductCode &&
                          errors.providerProductCode[index]?.name?.message
                        }
                      />
                    )}
                  />
                )}
              />
            </Box>

            <IconButton
              size='small'
              color='error'
              sx={{ width: '40px', height: '40px' }}
              onClick={() => providerProductCodeRemove(index)}
            >
              <DeleteForeverRounded />
            </IconButton>
          </Box>
        ))
      ) : (
        <Typography
          textAlign='center'
          fontStyle='italic'
          color='InactiveCaptionText'
        >
          No hay información del prestador, presioná Agregar para comenzar.
        </Typography>
      )}
    </div>
  );
}

export default KioskInformation;
