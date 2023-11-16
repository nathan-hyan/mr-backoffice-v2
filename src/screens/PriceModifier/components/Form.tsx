import { Control, FieldErrors } from 'react-hook-form';
import { Box, Button, InputAdornment } from '@mui/material';

import CustomInput from '~components/CustomInput/CustomInput';
import CustomSelect from '~components/CustomSelect';

import { PRICE_INPUTS, PriceModifierForm } from '../constants';

interface Props {
  control: Control<PriceModifierForm, unknown>;
  errors: FieldErrors<PriceModifierForm>;
  disabled: boolean;
}

function Form({ control, errors, disabled }: Props) {
  return (
    <>
      <CustomSelect
        name='type'
        control={control}
        label='Tipo de modificacion'
        error={errors.type && errors.type}
        data={[
          { optionName: 'Aumentar', value: 'incr' },
          { optionName: 'Bajar', value: 'decr' },
        ]}
      />

      <Box
        sx={{
          mt: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {PRICE_INPUTS.map(({ id, label, name, type }) => (
          <CustomInput
            key={id}
            control={control}
            inputProps={{
              startAdornment: (
                <InputAdornment position='start'>%</InputAdornment>
              ),
            }}
            label={label}
            type={type}
            name={name as keyof PriceModifierForm}
          />
        ))}
      </Box>
      <Box
        sx={{
          mt: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button disabled={disabled} variant='outlined'>
          Cancelar y volver
        </Button>
        <Button
          disabled={disabled}
          variant='contained'
          color='error'
          type='submit'
        >
          Cambiar todos los precios
        </Button>
      </Box>
    </>
  );
}

export default Form;
