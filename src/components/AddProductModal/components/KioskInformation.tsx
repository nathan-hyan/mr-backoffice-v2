import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { AddRounded, DeleteForeverRounded } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { Product } from 'types/data';

import {
    LOCAL_INFO_FORM,
    PROVIDER_PRODUCT_CODE_FORM_EMPTY,
} from '~components/AddProductModal/constants';
import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import CustomSelect from '~components/CustomSelect';
import { useProducts } from '~contexts/Products';

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
                fontWeight="bold"
            >
                Información del local
                <Button
                    onClick={() =>
                        providerProductCodeAppend(
                            PROVIDER_PRODUCT_CODE_FORM_EMPTY
                        )
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
                            label="Id del producto"
                            control={control}
                            error={
                                errors.providerProductCode &&
                                errors.providerProductCode[index]?.id
                            }
                            type={InputType.Number}
                            required
                        />
                        <CustomInput
                            name={`providerProductCode.${index}.name`}
                            label="Nombre del proveedor"
                            control={control}
                            error={
                                errors.providerProductCode &&
                                errors.providerProductCode[index]?.name
                            }
                            type={InputType.Text}
                            required
                        />

                        <IconButton
                            size="small"
                            color="error"
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
                    textAlign="center"
                    fontStyle="italic"
                    color="InactiveCaptionText"
                >
                    No hay informacion del prestador, presione
                    &quot;Agregar&quot; para comenzar
                </Typography>
            )}
            <CustomSelect
                name="brand"
                control={control}
                error={errors.brand}
                label="Marca"
                data={brands.map(({ name, id }) => ({
                    optionName: name,
                    value: id || '',
                }))}
            />
            {LOCAL_INFO_FORM.map((item) => (
                <CustomInput
                    key={item.id}
                    name={item.name}
                    control={control}
                    label={item.label}
                    type={item.type}
                    required={item.required}
                    error={errors[item.name] && errors[item.name]}
                />
            ))}
        </>
    );
}
export default KioskInformation;
