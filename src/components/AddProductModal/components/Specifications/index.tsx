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

import { SPECIFICATIONS_FORM_EMPTY } from '~components/AddProductModal/constants';

interface Props {
    control: Control<Product, unknown>;
    errors: FieldErrors<Product>;
}

function Specifications({ control, errors }: Props) {
    const {
        fields: specificationFields,
        remove: specificationRemove,
        append: specificationAppend,
    } = useFieldArray({ control, name: 'specifications' });

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
                Especificaciónes
                <Button
                    onClick={() =>
                        specificationAppend(SPECIFICATIONS_FORM_EMPTY)
                    }
                    startIcon={<AddRounded />}
                >
                    Agregar
                </Button>
            </Typography>
            <Divider sx={{ my: 2 }} />
            {specificationFields.length > 0 ? (
                specificationFields.map((item, index) => (
                    <Box
                        key={item.id}
                        sx={{
                            gap: 1,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Controller
                            name={`specifications.${index}.title`}
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
                                    label="Título"
                                    fullWidth
                                    required
                                    error={
                                        errors.specifications &&
                                        !!errors.specifications[index]?.title
                                    }
                                    helperText={
                                        errors.specifications &&
                                        errors.specifications[index]?.title
                                            ?.message
                                    }
                                />
                            )}
                        />
                        <Controller
                            name={`specifications.${index}.description`}
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
                                    label="Descripción"
                                    fullWidth
                                    required
                                    error={
                                        errors.specifications &&
                                        !!errors.specifications[index]
                                            ?.description
                                    }
                                    helperText={
                                        errors.specifications &&
                                        errors.specifications[index]
                                            ?.description?.message
                                    }
                                />
                            )}
                        />
                        <IconButton
                            size="small"
                            color="error"
                            sx={{ width: '40px', height: '40px' }}
                            onClick={() => {
                                specificationRemove(index);
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
                    No hay especificaciónes, presione &quot;Agregar&quot; para
                    comenzar
                </Typography>
            )}
        </>
    );
}
export default Specifications;
