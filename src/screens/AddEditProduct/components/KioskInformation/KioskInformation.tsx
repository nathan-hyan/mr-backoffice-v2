import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { DeleteForeverRounded } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import { PROVIDER_PRODUCT_CODE_FORM_EMPTY } from '~screens/AddEditProduct/constants';

import styles from './styles.module.scss';

interface Props {
  control: Control<Product, unknown>;
  errors: FieldErrors<Product>;
}

function KioskInformation({ control, errors }: Props) {
  const {
    fields: providerProductCodeFields,
    remove: providerProductCodeRemove,
    append: providerProductCodeAppend,
  } = useFieldArray({ control, name: 'providerProductCode' });

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
        Proveedores
        <button
          className={styles.addButton}
          type='button'
          onClick={() =>
            providerProductCodeAppend(PROVIDER_PRODUCT_CODE_FORM_EMPTY)
          }
        >
          Agregar
        </button>
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {providerProductCodeFields.length > 0 ? (
        providerProductCodeFields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              gap: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CustomInput
              name={`providerProductCode.${index}.id`}
              label='Id del producto'
              control={control}
              error={
                errors.providerProductCode &&
                errors.providerProductCode[index]?.id
              }
              type={InputType.Number}
              /*     required */
            />
            <CustomInput
              name={`providerProductCode.${index}.name`}
              label='Nombre del proveedor'
              control={control}
              error={
                errors.providerProductCode &&
                errors.providerProductCode[index]?.name
              }
              type={InputType.Text}
              /*  required */
            />

            <IconButton
              size='small'
              color='error'
              sx={{ width: '40px', height: '40px' }}
              onClick={() => {
                providerProductCodeRemove(index);
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
          No hay informacion del prestador, presione &quot;Agregar&quot; para
          comenzar
        </Typography>
      )}
    </div>
  );
}
export default KioskInformation;
