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
    VARIANTS_FORM_EMPTY,
} from '~components/AddProductModal/constants';

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
                fontWeight="bold"
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
                        <Controller
                            name={`variants.${index}.barCode`}
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
                                    label="Cod. Barra"
                                    fullWidth
                                    required
                                    error={
                                        errors.variants &&
                                        !!errors.variants[index]?.barCode
                                    }
                                    helperText={
                                        errors.variants &&
                                        errors.variants[index]?.barCode?.message
                                    }
                                />
                            )}
                        />
                        <Controller
                            name={`variants.${index}.color`}
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Color" fullWidth />
                            )}
                        />
                        <Controller
                            name={`variants.${index}.stock`}
                            control={control}
                            rules={{
                                required: true,
                                validate: {
                                    positive: (val) =>
                                        Number(val) > 0 ||
                                        'El numero no puede ser cero o negativo',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    onChange={({ target: { value } }) =>
                                        field.onChange(
                                            Number.isNaN(value)
                                                ? 0
                                                : parseInt(value, 10)
                                        )
                                    }
                                    label="Stock"
                                    value={field.value.toString()}
                                    required
                                    type={InputType.Number}
                                    fullWidth
                                    error={
                                        errors.variants &&
                                        !!errors.variants[index]?.stock
                                    }
                                    helperText={
                                        errors.variants &&
                                        errors.variants[index]?.stock?.message
                                    }
                                />
                            )}
                        />
                        <IconButton
                            size="small"
                            color="error"
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
                    textAlign="center"
                    fontStyle="italic"
                    color="InactiveCaptionText"
                >
                    No hay variantes del producto, presione &quot;Agregar&quot;
                    para comenzar
                </Typography>
            )}
        </>
    );
}
export default Variants;
