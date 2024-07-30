import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { AddRounded } from '@mui/icons-material';
import { Button, Divider, Typography } from '@mui/material';
import type { Product } from 'types/data';

import FieldInputs from './components/FieldInputs/FieldInputs';
import { VARIANTS_FORM_EMPTY } from './Variants.constants';
import { styles } from './Variants.styles';

interface Props {
  control: Control<Product, unknown>;
  errors: FieldErrors<Product>;
}

function Variants({ control, errors }: Props) {
  const {
    fields: variantsFields,
    remove: variantsRemove,
    append: variantsAppend,
  } = useFieldArray({ control, name: 'variants' });

  const hasVariantFields = variantsFields.length > 0;

  return (
    <>
      <Typography sx={styles.title} fontWeight='bold'>
        Variantes
        <Button
          onClick={() => variantsAppend(VARIANTS_FORM_EMPTY)}
          startIcon={<AddRounded />}
        >
          Agregar
        </Button>
      </Typography>

      <Divider sx={{ my: 2 }} />

      {hasVariantFields ? (
        <FieldInputs
          variantsFields={variantsFields}
          variantsRemove={variantsRemove}
          control={control}
          errors={errors}
        />
      ) : (
        <Typography
          textAlign='center'
          fontStyle='italic'
          color='InactiveCaptionText'
        >
          No hay variantes del producto, presione &quot;Agregar&quot; para
          comenzar
        </Typography>
      )}
    </>
  );
}
export default Variants;
