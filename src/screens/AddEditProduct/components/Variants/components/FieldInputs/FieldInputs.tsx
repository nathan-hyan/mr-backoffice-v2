import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
} from 'react-hook-form';
import { DeleteForeverRounded } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import type { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';

import { styles } from './FieldInputs.styles';

interface Props {
  variantsFields: FieldArrayWithId<Product, 'variants', 'id'>[];
  control: Control<Product, unknown>;
  errors: FieldErrors<Product>;
  variantsRemove: UseFieldArrayRemove;
}

function FieldInputs({
  variantsFields,
  control,
  errors,
  variantsRemove,
}: Props) {
  return variantsFields.map((item, index) => (
    <Box key={item.id} sx={styles.variantsBox}>
      <CustomInput
        name={`variants.${index}.barCode`}
        control={control}
        label='Cod. Barra'
        type={InputType.Number}
        required
        error={errors.variants && errors.variants[index]?.barCode}
      />

      <CustomInput
        name={`variants.${index}.color`}
        control={control}
        label='Color'
        type={InputType.Text}
      />

      <CustomInput
        type={InputType.Number}
        name={`variants.${index}.stock`}
        control={control}
        label='Stock'
        required
        error={errors.variants && errors.variants[index]?.stock}
      />

      <IconButton
        size='small'
        color='error'
        sx={styles.deleteButton}
        onClick={() => {
          variantsRemove(index);
        }}
      >
        <DeleteForeverRounded />
      </IconButton>
    </Box>
  ));
}
export default FieldInputs;
