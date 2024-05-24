import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Divider, Typography } from '@mui/material';
import { Product } from 'types/data';

import { STOCK_FORM } from '~components/AddProductModal/constants';
import CustomInput from '~components/CustomInput/CustomInput';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  errors: FieldErrors<Product>;
  setValue: UseFormSetValue<Product>;
}

function Stock({ control }: Props) {
  return (
    <>
      <Typography sx={{ mt: 5 }} fontWeight='bold'>
        Stock
      </Typography>

      <Divider sx={{ my: 2 }} />

      {STOCK_FORM.map((item) => (
        <CustomInput
          key={item.id}
          control={control}
          {...item}
          name={`stock.${item.name}`}
        />
      ))}
    </>
  );
}
export default Stock;
