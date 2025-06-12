import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
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
}

function Stock({ control, watch, errors }: Props) {
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
          disabled={watch('stock.noPhysicalStock')}
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
              <Radio
                sx={{
                  color: '#9c9c9c',
                  '&.Mui-checked': {
                    color: '#1976d2',
                  },
                }}
              />
            }
            label='Sin Stock (Por Ejemplo ,Fotocopias, servicios de boletas)'
            {...field}
          />
        )}
      />
    </div>
  );
}
export default Stock;
