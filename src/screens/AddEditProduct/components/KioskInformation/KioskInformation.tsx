import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { AddRounded, DeleteForeverRounded } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import CustomSelect from '~components/CustomSelect';
import { useProducts } from '~contexts/Products';
import {
  LOCAL_INFO_FORM,
  PROVIDER_PRODUCT_CODE_FORM_EMPTY,
} from '~screens/AddEditProduct/constants';

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

  const { brands } = useProducts();

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
        Proveedores
        <Button
          onClick={() =>
            providerProductCodeAppend(PROVIDER_PRODUCT_CODE_FORM_EMPTY)
          }
          startIcon={<AddRounded />}
        >
          Agregar
        </Button>
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
      <CustomSelect
        name='brand'
        control={control}
        error={errors.brand}
        label='Marca'
        data={brands.map(({ name, id }) => ({
          optionName: name,
          value: id || '',
        }))}
      />

      <CustomSelect
        name='stockOwner'
        /*         required */
        control={control}
        error={errors.stockOwner}
        label='Dueño de stock'
        data={[
          {
            optionName: 'Mundo Regalo',
            value: 'Mundo Regalo',
          },
          {
            optionName: 'mr Tienda',
            value: 'mr Tienda',
          },
        ]}
      />

      {LOCAL_INFO_FORM.map((item) => (
        <CustomInput
          key={item.id}
          name={item.name}
          control={control}
          label={item.label}
          type={item.type}
          /*           required={item.required} */
          error={errors[item.name] && errors[item.name]}
        />
      ))}
    </>
  );
}
export default KioskInformation;
