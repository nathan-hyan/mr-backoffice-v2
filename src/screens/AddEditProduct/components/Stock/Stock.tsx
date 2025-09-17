/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';

import styles from './styles.module.scss';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  errors: FieldErrors<Product>;
  setValue: UseFormSetValue<Product>;
}

function Stock({ control, watch, errors, setValue }: Props) {
  const noPhysicalStock = watch('stock.noPhysicalStock');

  useEffect(() => {
    if (noPhysicalStock) {
      setValue('stock.minStock', 1);
      setValue('stock.maxStock', 1);
      setValue('stock.current', 0);
    }
  }, [noPhysicalStock, setValue]);

  return (
    <div className={styles.container}>
      <Typography sx={{ mt: 5 }} color='#454545' fontWeight='bold'>
        Stock
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <CustomInput
          control={control}
          name='stock.current'
          label='Actual'
          type={InputType.Number}
          /*   disabled={watch('stock.noPhysicalStock')}
          required={!watch('stock.noPhysicalStock')} */
          /* rules={{
            min:
              watch('stock.minStock') > 0
                ? {
                    value: watch('stock.minStock'),
                    message: 'El stock actual no puede ser menor al mínimo',
                  }
                : undefined,
            max:
              watch('stock.maxStock') > 0
                ? {
                    value: watch('stock.maxStock'),
                    message: 'El stock actual no puede ser mayor al máximo',
                  }
                : undefined,
          }} */
          error={errors.stock?.current}
        />
        <CustomInput
          control={control}
          name='stock.minStock'
          label='Mínimo'
          type={InputType.Number}
          error={errors.stock?.minStock}
          disabled={Boolean(watch('stock.noPhysicalStock'))}
          rules={{
            validate: () => {
              if (watch('stock.minStock') > watch('stock.maxStock')) {
                return 'El stock mínimo no puede ser mayor al máximo';
              }

              return true;
            },
          }}
        />
        <CustomInput
          control={control}
          name='stock.maxStock'
          label='Máximo'
          type={InputType.Number}
          error={errors.stock?.maxStock}
          /* disabled={watch('stock.noPhysicalStock')}
          rules={{
            validate: () => {
              if (watch('stock.maxStock') < watch('stock.minStock')) {
                return 'El stock máximo no puede ser menor al mínimo';
              }

              return true;
            },
          }} */
        />
      </Box>

      <Controller
        control={control}
        name='stock.noPhysicalStock'
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            sx={{ color: '#9c9c9c' }}
            control={
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                sx={{
                  margin: 1,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: '2px solid #9c9c9c',
                  padding: 0,
                  '&.Mui-checked': {
                    backgroundColor: '#79A8FF',
                    borderColor: '#79A8FF',
                  },
                  '& .MuiSvgIcon-root': {
                    display: 'none',
                  },
                  '&.Mui-checked::before': {
                    content: '""',
                    display: 'block',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    margin: 'auto',
                  },
                }}
              />
            }
            label='Sin Stock (Por Ejemplo, Fotocopias, servicios de boletas)'
          />
        )}
      />
    </div>
  );
}
export default Stock;
