import { Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Divider, Grid, InputAdornment, Typography } from '@mui/material';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import { PRICE_FORM } from '~screens/AddEditProduct/constants';
import calculateNumberWithPercentage from '~utils/addPercentage';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  errors: FieldErrors<Product>;
}

function Prices({ control, errors, watch }: Props) {
  return (
    <>
      <Typography sx={{ mt: 5 }} fontWeight='bold'>
        Precios
      </Typography>
      <Divider sx={{ my: 2 }} />
      <CustomInput
        label='Precio de costo'
        name='prices.cost.value'
        type={InputType.Number}
        control={control}
        required
        error={errors.prices?.cost?.value}
      />
      <Grid container spacing={2}>
        {PRICE_FORM.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <CustomInput
              inputProps={{
                startAdornment: (
                  <InputAdornment position='start'>%</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography variant='caption'>
                      ($
                      {calculateNumberWithPercentage(
                        watch('prices.cost.value'),
                        watch(`prices.${item.name}.value`),
                        'incr'
                      ).toFixed(2)}
                      )
                    </Typography>
                  </InputAdornment>
                ),
              }}
              label={item.label}
              name={`prices.${item.name}.value`}
              type={item.type}
              control={control}
              error={
                errors.prices ? errors.prices[item.name]?.value : undefined
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default Prices;
