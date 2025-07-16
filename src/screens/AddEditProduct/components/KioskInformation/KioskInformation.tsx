import { useMemo, useState } from 'react';
import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
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
}

function KioskInformation({ control, errors }: Props) {
  const { providers } = useProviders();

  const {
    fields: providerProductCodeFields,
    remove: providerProductCodeRemove,
    append: providerProductCodeAppend,
  } = useFieldArray({ control, name: 'providerProductCode' });

  const [search, setSearch] = useState('');

  const filteredProviders = useMemo(() => {
    return providers.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, providers]);

  const isAlreadySelected = (providerId: string) => {
    return providerProductCodeFields.some((field) => field.id === providerId);
  };

  const handleAddProvider = (
    selectedProvider: (typeof providers)[0] | null
  ) => {
    if (!selectedProvider || isAlreadySelected(selectedProvider.id)) return;

    providerProductCodeAppend({
      id: selectedProvider.id,
      name: selectedProvider.name,
    });
  };

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

      <Autocomplete
        options={filteredProviders}
        getOptionLabel={(option) => option.name}
        onChange={(_, newValue) => handleAddProvider(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Buscar proveedor'
            variant='outlined'
            sx={{
              mb: 2,
              label: { color: '#454545' },
              input: { color: '#454545' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#454545',
              },
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        openOnFocus
      />

      <Divider sx={{ mb: 2 }} />

      {providerProductCodeFields.length > 0 ? (
        providerProductCodeFields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              gap: 1,
              display: 'flex',
              alignItems: 'center',
              paddingBottom: 3,
            }}
          >
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
            <CustomInput
              name={`providerProductCode.${index}.name`}
              label='Nombre del proveedor'
              control={control}
              error={
                errors.providerProductCode &&
                errors.providerProductCode[index]?.name
              }
              type={InputType.Text}
            />
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
          No hay información del prestador, presioná Agregar o buscá por nombre
          para comenzar.
        </Typography>
      )}
    </div>
  );
}

export default KioskInformation;
