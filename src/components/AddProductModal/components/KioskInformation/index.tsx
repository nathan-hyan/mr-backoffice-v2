import {
    Control,
    Controller,
    FieldErrors,
    useFieldArray,
} from 'react-hook-form';
import { AddRounded, DeleteForeverRounded } from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { Product } from 'types/data';

import {
    InputType,
    LOCAL_INFO_FORM,
    PROVIDER_PRODUCT_CODE_FORM_EMPTY,
} from '~components/AddProductModal/constants';

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
                        <Controller
                            name={`providerProductCode.${index}.id`}
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Este campo es obligatorio',
                                },
                                validate: {
                                    positive: (val) =>
                                        Number(val) > 0 ||
                                        'El numero no puede ser cero o negativo',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={
                                        errors.providerProductCode
                                            ? !!errors.providerProductCode[
                                                  index
                                              ]?.id
                                            : false
                                    }
                                    helperText={
                                        errors.providerProductCode
                                            ? errors.providerProductCode[index]
                                                  ?.id?.message
                                            : false
                                    }
                                    label="Id del producto"
                                    type={InputType.Number}
                                    required
                                    fullWidth
                                />
                            )}
                        />
                        <Controller
                            name={`providerProductCode.${index}.name`}
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Este campo es obligatorio',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Nombre del proveedor"
                                    required
                                    fullWidth
                                    error={
                                        errors.providerProductCode
                                            ? !!errors.providerProductCode[
                                                  index
                                              ]?.name
                                            : false
                                    }
                                    helperText={
                                        errors.providerProductCode
                                            ? errors.providerProductCode[index]
                                                  ?.name?.message
                                            : false
                                    }
                                />
                            )}
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
            {LOCAL_INFO_FORM.map((item) => (
                <Controller
                    key={item.id}
                    name={item.name}
                    control={control}
                    rules={{
                        required: {
                            value: item.required,
                            message: 'Este campo es obligatorio',
                        },
                        validate: {
                            positive:
                                item.type === InputType.Number && item.required
                                    ? (val) =>
                                          Number(val) > 0 ||
                                          'El numero no puede ser cero o negativo'
                                    : () => true,
                            positiveWithNoRequired:
                                item.type === InputType.Number && !item.required
                                    ? (val) =>
                                          Number(val) >= 0 ||
                                          'El numero no puede ser negativo'
                                    : () => true,
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={item.label}
                            type={item.type}
                            required={item.required}
                            fullWidth
                            error={!!errors[item.name]}
                            helperText={errors[item.name]?.message}
                            variant="standard"
                        />
                    )}
                />
            ))}
        </>
    );
}
export default KioskInformation;
