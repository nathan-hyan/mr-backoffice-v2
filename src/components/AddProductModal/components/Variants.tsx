import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { AddRounded, DeleteForeverRounded } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { Product } from 'types/data';

import { VARIANTS_FORM_EMPTY } from '~components/AddProductModal/constants';
import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';

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

  return (
    <>
      <Typography
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        fontWeight='bold'
      >
        Variantes
        <Button
          onClick={() => variantsAppend(VARIANTS_FORM_EMPTY)}
          startIcon={<AddRounded />}
        >
          Agregar
        </Button>
      </Typography>
      <Divider sx={{ my: 2 }} />
      {variantsFields.length > 0 ? (
        variantsFields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              gap: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
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
              sx={{ width: '40px', height: '40px' }}
              onClick={() => {
                variantsRemove(index);
              }}
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
          No hay variantes del producto, presione &quot;Agregar&quot; para
          comenzar
        </Typography>
      )}
    </>
  );
}
export default Variants;
