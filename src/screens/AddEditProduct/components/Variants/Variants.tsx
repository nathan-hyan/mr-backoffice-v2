import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { Divider, Typography } from '@mui/material';
import { Product } from 'types/data';

import styles from './styles.module.scss';

import FieldInputs from './components/FieldInputs/FieldInputs';
import { VARIANTS_FORM_EMPTY } from './Variants.constants';

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
    <div className={styles.container}>
      <Typography
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#454545',
        }}
        color='#454545'
        fontWeight='bold'
      >
        Variantes
        <button
          className={styles.addButton}
          type='button'
          onClick={() => variantsAppend(VARIANTS_FORM_EMPTY)}
        >
          Agregar
        </button>
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
    </div>
  );
}
export default Variants;
