import { Control, FieldErrors } from 'react-hook-form';
import { Divider, Typography } from '@mui/material';
import { Product } from 'types/data';

import CustomInput from '~components/CustomInput/CustomInput';
import { PRICE_FORM } from '~screens/AddEditProduct/constants';

interface Props {
  control: Control<Product, unknown>;
  errors: FieldErrors<Product>;
}

function Prices({ control, errors }: Props) {
  return (
    <>
      <Typography sx={{ mt: 5 }} fontWeight='bold'>
        Precios
      </Typography>
      <Divider sx={{ my: 2 }} />
      {PRICE_FORM.map((item) => (
        <CustomInput
          key={item.id}
          label={item.label}
          name={`prices.${item.name}.value`}
          type={item.type}
          control={control}
          error={errors.prices ? errors.prices[item.name]?.value : undefined}
        />
      ))}
    </>
  );
}
export default Prices;
